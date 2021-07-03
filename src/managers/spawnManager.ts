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

export function run(): void {
    for (const roomHash in Game.rooms) {
        const room = Game.rooms[roomHash];

        if (Game.time % 100 === 0 || !configurations[roomHash]) {
            configurations[roomHash] = room.configuration();
        }

        const neededRole = room.neededRoles()[0];
        if (neededRole) {
            const spawn = _.filter(room.closestSpawns(), s => !s.spawning && s.store[RESOURCE_ENERGY] >= _.sum(RoleBodyParts[neededRole].map((b) => BODYPART_COST[b])))[0];
            if (spawn) {
                const creepName = Math.random().toString(36).substr(2, 5);
                const spawnStatus = spawn.spawnCreep(RoleBodyParts[neededRole], creepName, {
                    memory: {
                        role: neededRole,
                        task: RoleTasks[neededRole][0],
                        room: room.name
                    }
                });

                console.log(RoleTasks[neededRole][0]);

                if (spawnStatus === OK)
                    console.log(`Spawn ${creepName} on ${spawn.name} in ${room.name}`);
            }
        }
    }
}
