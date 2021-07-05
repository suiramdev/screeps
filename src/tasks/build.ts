import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    const room = Game.rooms[creep.memory.room];
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        creep.memory.needEnergy = true;
        return TaskStatus.COMPLETED;
    } else if (creep.store.getFreeCapacity() <= 0) creep.memory.needEnergy = false;

    const targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
        filter: object => object.progress < object.progressTotal
    });
    targets.sort((a,b) => a.progress - b.progress);

    if(targets.length <= 0) return TaskStatus.FAILED;

    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.travelTo(targets[0])
    }

    return TaskStatus.WORKING;
}
