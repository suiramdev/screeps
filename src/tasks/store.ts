import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        creep.memory.needEnergy = true;
        return TaskStatus.COMPLETED;
    } else if (creep.store.getFreeCapacity() <= 0) creep.memory.needEnergy = false;

    const storages = _.sortByOrder(creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => (structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_STORAGE ||
            structure.structureType === STRUCTURE_TOWER) &&
            (structure as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) > 0
    }), s => creep.pos.getRangeTo(s), ["desc"]);

    if (storages.length <= 0) {
        creep.speech("📦❌");

        return TaskStatus.FAILED;
    }

    creep.speech("📦");
    if (creep.transfer(storages[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(storages[0]);
        return TaskStatus.COMPLETED;
    }

    return TaskStatus.WORKING;
}
