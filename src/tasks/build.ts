import { TaskStatus, Task } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    const construction = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    if (construction) {
        creep.say("🔨 Build");

        if (creep.build(construction) == ERR_NOT_IN_RANGE) {
            creep.moveTo(construction);
        }
    } else {
        creep.say("🔨❌ Build");

        return TaskStatus.FAILED;
    }

    return TaskStatus.OK;
}
