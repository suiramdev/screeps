import { TaskStatus, Task } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    // TODO: Find the already started construction site before doing the closest one
    if (!creep.memory.buildTarget) {
      creep.memory.buildTarget = creep.room.find(FIND_MY_CONSTRUCTION_SITES)[0].id;
    }
    if (creep.memory.buildTarget) {
        const target = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
          filter: { id: creep.memory.buildTarget }
        })[0];
        creep.speech("🔨");

        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    } else {
        return creep.runTask(Task.REPAIR);
    }

    return TaskStatus.OK;
}
