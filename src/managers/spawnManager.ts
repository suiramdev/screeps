import { Role, RoleBodyParts, RoleTasks } from "./rolesManager";

Room.prototype.configuration = function () {
    return [
        { role: Role.HARVESTER, min: 1, max: this.find(FIND_SOURCES).length * 2 },
        { role: Role.BUILDER, min: this.find(FIND_MY_CONSTRUCTION_SITES).length, max: this.find(FIND_MY_CONSTRUCTION_SITES).length },
        { role: Role.UPGRADER, min: this.controller ? 1 : 0, max: this.controller ? this.controller?.level * 2 : 0 },
        { role: Role.REPAIRER, min: 1, max: this.find(FIND_STRUCTURES).length }
    ]
}

Room.prototype.getNeededRoles = function () {
    const neededRoles: Role[] = [];
    for (const configuration of this.configuration()) {
        if (_.filter(this.find(FIND_MY_CREEPS), (creep) => creep.memory.role === configuration.role).length < configuration.max) {
            neededRoles[neededRoles.length] = configuration.role
        }
    }

    return neededRoles
}

export function run(): void {
    for (const spawnName in Game.spawns) {
        const spawn: StructureSpawn = Game.spawns[spawnName];
        const room: Room = spawn.room;

        spawn.memory.needToSpawn = room.getNeededRoles().length > 0;
        if (spawn.memory.needToSpawn) {
            const role = room.getNeededRoles()[0];

            spawn.spawnCreep(RoleBodyParts[role], role + "_" + Math.random().toString(36).substr(2, 5), {
                memory: {
                    "role": role,
                    "roleTask": RoleTasks[role][0]
                }
            });
        }
    }
}
