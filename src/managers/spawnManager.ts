import { Role, BodyParts, RoleTasks } from "./rolesManager";
import { TaskStatus } from "./tasksManager";

interface SpawnConfiguration {
    [key: string]: any
}

Spawn.prototype.configuration = function () {
    return [
        { role: Role.HARVESTER, min: 1, max: this.room.find(FIND_SOURCES).length * 2 },
        { role: Role.BUILDER, min: 1, max: 1 },
        { role: Role.UPGRADER, min: 1, max: 2 },
    ]
}

export function run(): void {
    for (let spawnName in Game.spawns) {
        let spawn: StructureSpawn = Game.spawns[spawnName];
        let room: Room = spawn.room;

        for (let i = 0; i < spawn.configuration().length; i++) {
            const configuration = spawn.configuration()[i];

            if (_.filter(room.find(FIND_MY_CREEPS), (c) => c.memory.role == configuration.role).length < configuration.max) {
                spawn.spawnCreep(BodyParts[configuration.role], Math.random().toString(36).substr(2, 9), {
                    memory: {
                        defaultRole: configuration.role,
                        role: configuration.role,
                        roleTask: RoleTasks[configuration.role][0],
                        roleTaskStatus: TaskStatus.OK,
                        pauseRole: false
                    }
                });
                break;
            } else {
                continue;
            }
        }
    }
}
