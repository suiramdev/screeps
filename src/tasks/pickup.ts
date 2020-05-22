import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    const storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_STORAGE ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION
        }
    });
    if (storage) {
        creep.say("📦 Pickup");

        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    } else {
        creep.say("📦❌ Pickup");

        return TaskStatus.FAILED;
    }

    return TaskStatus.OK;
}
