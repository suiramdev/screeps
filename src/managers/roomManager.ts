import {Role, RoleBodyParts, RoleTasks} from "./rolesManager";

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
            needed: this.find(FIND_MY_STRUCTURES).length > 0 ? 1 : 0
        },
        {
            role: Role.BUILDER,
            needed: this.find(FIND_MY_CONSTRUCTION_SITES).length > 0 ? 1 : 0
        },
        {
            role: Role.SAFER,
            needed: this.sourceStorages().length
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
    return _.sortBy(Game.spawns, s => Game.map.getRoomLinearDistance(this.name, s.room.name));
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

    Object.keys(Game.rooms).sort((a, b) => subpopulations[a] - subpopulations[b])
        .forEach(roomHash => {
            const room = Game.rooms[roomHash];

            const neededRole = room.neededRoles()[0];
            if (neededRole) {
                // TODO: Look to unused creeps
                const spawn: StructureSpawn = _.filter(room.closestSpawns(), s => !s.spawning)[0];
                if (spawn) {
                    const creepName: string = neededRole + "_" + Math.random().toString(36).substr(2, 5);

                    const saferCount = _.filter(Game.creeps, c => c.memory.role === Role.SAFER && c.memory.room === spawn.room.name).length;
                    let energyRemaining: number = saferCount > 0 ? spawn.room.energyCapacityAvailable : spawn.store.getCapacity(RESOURCE_ENERGY);
                    const creepParts: BodyPartConstant[] = [];

                    const keys = Object.keys(RoleBodyParts[neededRole as Role]);
                    for (const bodyPart in RoleBodyParts[neededRole as Role]) {
                        const percentage = RoleBodyParts[neededRole as Role][bodyPart];
                        const isLast = keys[keys.length] === bodyPart;

                        for (let i = 0; i < (isLast ? energyRemaining : energyRemaining * percentage) / BODYPART_COST[bodyPart as BodyPartConstant]; i++) {
                            creepParts.push(bodyPart as BodyPartConstant);
                            energyRemaining -= BODYPART_COST[bodyPart as BodyPartConstant];
                        }
                    }

                    const spawnStatus = spawn.spawnCreep(creepParts, creepName, {
                        memory: {
                            role: neededRole,
                            task: RoleTasks[neededRole][0],
                            room: room.name
                        }
                    });

                    if (spawnStatus === OK)
                        console.log(`Spawn ${creepName} on ${spawn.name} in ${room.name}`);
                }
            }
        });
}
