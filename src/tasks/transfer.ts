import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    const room = Game.rooms[creep.memory.room];
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        creep.memory.needEnergy = true;
        return TaskStatus.COMPLETED;
    } else if (creep.store.getFreeCapacity() <= 0) creep.memory.needEnergy = false;

    const storages = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_SPAWN ||
                structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_STORAGE ||
                structure.structureType === STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    });
    const storage = creep.pos.findClosestByPath(storages);

    if (storage) {
        creep.speech("📦");

        if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(storage);
        }
    } else {
        creep.speech("📦❌");

        return TaskStatus.FAILED;
    }

    return TaskStatus.WORKING;
}
