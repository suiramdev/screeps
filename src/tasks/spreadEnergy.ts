import {TaskStatus} from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) return TaskStatus.COMPLETED;

    let target: Creep|null = null;
    for (const anyCreep of _.sortBy(_.filter(Game.creeps, c => c.memory.needEnergy),
            c => c.store.getFreeCapacity(RESOURCE_ENERGY) && creep.pos.getRangeTo(c))) {
        if (_.filter(Game.creeps, c => c !== creep && c.memory.target === anyCreep.id).length > 0) continue;

        target = anyCreep;
        creep.memory.target = anyCreep.id;
    }

    if (!target) return TaskStatus.COMPLETED;

    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
        creep.travelTo(target);

    creep.speech("📦");

    return TaskStatus.WORKING;
}
