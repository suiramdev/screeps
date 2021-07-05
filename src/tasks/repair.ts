import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    const room = Game.rooms[creep.memory.room];
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        creep.memory.needEnergy = true;
        return TaskStatus.COMPLETED;
    } else if (creep.store.getFreeCapacity() <= 0) creep.memory.needEnergy = false;

    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
    });
    targets.sort((a,b) => a.hits - b.hits);

    if(targets.length <= 0) return TaskStatus.FAILED;

    if(creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targets[0]);
    }

    creep.speech("🔧");

    return TaskStatus.WORKING;
}
