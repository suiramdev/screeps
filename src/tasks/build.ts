import { TaskStatus, Task } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    // TODO: Find the already started construction site before doing the closest one
    const constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (constructions[0]) {
        creep.speech("🔨");

        if (creep.build(constructions[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructions[0]);
        }
    } else {
        creep.speech("🔨❌");

        return TaskStatus.FAILED;
    }

    return TaskStatus.OK;
}
