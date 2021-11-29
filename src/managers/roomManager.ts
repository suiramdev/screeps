import {Role, RoleBodyParts, RoleTasks} from "./rolesManager";
import {roomLink} from "../utils/room";

Room.prototype.configuration = function () {
    return [
        {
            role: Role.HARVESTER,
            needed: this.sourceStorages().length
        },
        {
            role: Role.CARRIER,
            needed: this.sourceStorages().length
        },
        {
            role: Role.UPGRADER,
            needed: this.controller ? 1 : 0
        },
        {
            role: Role.REPAIRER,
            needed: _.filter(this.find(FIND_MY_STRUCTURES), s => s.hits < s.hitsMax).length > 0 ? 1 : 0
        },
        {
            role: Role.BUILDER,
            needed: this.find(FIND_MY_CONSTRUCTION_SITES).length > 0 ? 1 : 0
        }
    ];
}

Room.prototype.neededRoles = function () {
    const neededRoles: string[] = [];
    for (const configuration of configurations[this.name]) {
        if (_.filter(Game.creeps,
            creep => creep.memory.room === this.name && creep.memory.role === configuration.role
        ).length < configuration.needed)
            neededRoles.push(configuration.role);
    }
    return neededRoles;
}

Room.prototype.closestSpawns = function () {
    return _.sortByOrder(Game.spawns, s => Game.map.getRoomLinearDistance(this.name, s.room.name), ["desc"]);
}

const configurations: Record<string, any[]> = {};
const subpopulations: Record<string, number> = {};

export function run(): void {
    // Calculation of room configuration each X ticks
    for (const roomHash in Game.rooms) {
        const room = Game.rooms[roomHash];
        if (Game.time % 100 === 0 || !configurations[roomHash]) {
            configurations[roomHash] = room.configuration();
            configurations[roomHash].forEach(conf => subpopulations[roomHash] += conf.needed);
        }
    }

    for (const room of _.sortBy(Game.rooms, r => subpopulations[r.name])) {
        const neededRole = room.neededRoles()[0];
        if (neededRole) {
            // TODO: Look to unused creeps
            const spawn: StructureSpawn = _.filter(room.closestSpawns(), s => !s.spawning)[0];
            if (spawn) {
                const creepName: string = neededRole + "_" + Math.random().toString(36).substr(2, 5);

                const creepParts: BodyPartConstant[] = [];
                const keys = Object.keys(RoleBodyParts[neededRole as Role]);
                for (const bodyPart in RoleBodyParts[neededRole as Role]) {
                    const percentage = RoleBodyParts[neededRole as Role][bodyPart];
                    const isLast = keys[keys.length] === bodyPart;

                    for (let i = 0; i < (isLast ? spawn.room.energyCapacityAvailable : spawn.room.energyCapacityAvailable * percentage) / BODYPART_COST[bodyPart as BodyPartConstant]; i++) {
                        creepParts.push(bodyPart as BodyPartConstant);
                        spawn.room.energyCapacityAvailable -= BODYPART_COST[bodyPart as BodyPartConstant];
                    }
                }

                const spawnStatus = spawn.spawnCreep(creepParts, creepName, {
                    memory: {
                        role: neededRole,
                        taskIndex: 0,
                        task: RoleTasks[neededRole][0][0],
                        room: room.name
                    }
                });

                if (spawnStatus === OK)
                    console.log(`<span style="color: gray;">Spawn ${creepName} on ${spawn.name} in ${roomLink(room.name)}</span>`);
            }
        }
    }
}
