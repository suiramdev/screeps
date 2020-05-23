import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    const ressource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (ressource) {
        creep.say("⛏️");

        if (creep.harvest(ressource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(ressource);
        }
    } else {
        creep.say("⛏️❌");

        return TaskStatus.FAILED;
    }

    return TaskStatus.OK;
}
