import { TaskStatus } from "managers/tasksManager";

const signText = "Territory of HamsterOh, all creeps inside will be destroyed.";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        return TaskStatus.COMPLETED;
    }

    if (creep.room.controller) {
        creep.say("🔧");

        if (creep.room.controller.sign?.text != signText) {
            if (creep.signController(creep.room.controller, signText) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    } else {
        creep.say("🔧❌");

        return TaskStatus.FAILED
    }

    return TaskStatus.OK
}
