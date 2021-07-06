import {TaskStatus} from "managers/tasksManager";
import {Role} from "../managers/rolesManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) return TaskStatus.COMPLETED;

    const possibleTargets = _.sortBy(_.filter(Game.creeps, c => c.memory.needEnergy),
        c => c.store.getFreeCapacity(RESOURCE_ENERGY) && creep.pos.getRangeTo(c));

    let target: Creep|null = _.filter(possibleTargets, c => c.id === creep.memory.target)[0];
    if (!target) {
        for (const anyCreep of possibleTargets) {
            if (_.filter(Game.creeps, c => c !== creep && c.memory.role === Role.CARRIER && c.memory.target === anyCreep.id).length > 0) continue;

            target = anyCreep;
            creep.memory.target = anyCreep.id;
        }

        if (!target) return TaskStatus.COMPLETED;
    }

    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
        creep.travelTo(target);

    creep.speech("📦");

    return TaskStatus.WORKING;
}
