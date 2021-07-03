import {TaskStatus} from "managers/tasksManager";
import {Role} from "../managers/rolesManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity() <= 0) return TaskStatus.COMPLETED;

    const room = Game.rooms[creep.memory.room];
    let target: StructureStorage|null = null;
    for (const storage of _.sortBy(room.sourceStorages(), s => s.store.getUsedCapacity())) {
        if (_.filter(Game.creeps, c => c !== creep && c.memory.role === Role.CARRIER && c.memory.target === storage.id).length > 0) continue;

        target = storage;
        creep.memory.target = storage.id;
    }
    if (!target) return TaskStatus.FAILED;

    for (const resourceType of RESOURCES_ALL) {
        if (creep.withdraw(target, resourceType) === ERR_NOT_IN_RANGE)
            creep.moveTo(target);
    }

    creep.speech("👌");

    return TaskStatus.WORKING;
}
