import { TaskStatus, Task } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    const storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            if (structure.structureType == STRUCTURE_SPAWN) {
                return !structure.memory.needToSpawn;
            } else {
                return structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_CONTAINER
            }
        }
    });
    if (storage) {
        creep.say("📦 Pickup");

        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    } else {
        return creep.runTask(Task.HARVEST);
    }

    return TaskStatus.OK;
}
