import {TaskStatus} from "managers/tasksManager";

const signText = "Territory of HamsterOh, all unknown creeps inside will be destroyed.";

export function run(creep: Creep): TaskStatus {
    const room = Game.rooms[creep.memory.room];
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        creep.memory.needEnergy = true;
        return TaskStatus.COMPLETED;
    } else if (creep.store.getFreeCapacity() <= 0) creep.memory.needEnergy = false;

    if (!room.controller) return TaskStatus.FAILED;

    if (room.controller.sign?.text !== signText)
        if (creep.signController(room.controller, signText) === ERR_NOT_IN_RANGE)
            creep.travelTo(room.controller);

    if (creep.upgradeController(room.controller) === ERR_NOT_IN_RANGE)
        creep.travelTo(room.controller);

    creep.speech("🔧");

    return TaskStatus.WORKING;
}
