import { TaskStatus } from "managers/tasksManager";
import {Role} from "../managers/rolesManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
        creep.memory.needEnergy = true;
        return TaskStatus.COMPLETED;
    } else if (creep.store.getFreeCapacity() <= 0) creep.memory.needEnergy = false;

    const storages: StructureStorage[] = creep.room.find(FIND_MY_STRUCTURES, {
        filter: s => (s.structureType === STRUCTURE_SPAWN ||
                s.structureType === STRUCTURE_EXTENSION ||
                s.structureType === STRUCTURE_STORAGE ||
                s.structureType === STRUCTURE_TOWER) &&
                (s as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });

    if (storages.length <= 0) return TaskStatus.FAILED;

    let target: StructureStorage|null = _.filter(storages, c => c.id === creep.memory.target)[0];
    if (!target) {
        for (const storage of storages) {
            if (_.filter(Game.creeps, c => c !== creep && c.memory.role === Role.CARRIER && c.memory.target === storage.id).length > 0) continue;

            target = storage;
            creep.memory.target = storage.id;
            break;
        }

        if (!target) return TaskStatus.COMPLETED;
    }

    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
        creep.travelTo(target);

    creep.speech("📦");

    return TaskStatus.WORKING;
}
