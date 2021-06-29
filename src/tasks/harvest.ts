import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    const resource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (resource) {
        creep.speech("⛏️");

        if (creep.harvest(resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(resource);
        }
    } else {
        creep.speech("⛏️❌");

        return TaskStatus.FAILED;
    }

    return TaskStatus.OK;
}
