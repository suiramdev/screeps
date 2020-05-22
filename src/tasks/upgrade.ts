import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    if (creep.room.controller) {
        creep.say("🔧 Upgrade");

        if (creep.room.controller.sign?.username != "HamsterOh") {
            if (creep.signController(creep.room.controller, "Territory of HamsterOh, all creeps inside will be destroyed.") == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    } else {
        creep.say("🔧❌ Upgrade");

        return TaskStatus.FAILED
    }

    return TaskStatus.OK
}
