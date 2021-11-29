import {Task, TaskStatus} from "./tasksManager";

export enum Role {
    HARVESTER = "HARVESTER",
    CARRIER = "CARRIER",
    UPGRADER = "UPGRADER",
    REPAIRER = "REPAIRER",
    BUILDER = "BUILDER"
}

export const RoleTasks: Record<string, string[][]> = {
    [Role.HARVESTER]:   [[Task.HARVEST]],
    [Role.CARRIER]:     [[Task.CARRY], [Task.STORE, Task.SPREAD_ENERGY]],
    [Role.UPGRADER]:    [[Task.UPGRADE]],
    [Role.REPAIRER]:    [[Task.REPAIR, Task.BUILD]],
    [Role.BUILDER]:     [[Task.BUILD, Task.REPAIR]]
}

export const RoleBodyParts: Record<Role, Record<string, number>> = {
  [Role.HARVESTER]:   {[MOVE]: 0.1, [CARRY]: 0.1, [WORK]: 0.8},
  [Role.CARRIER]:     {[MOVE]: 0.4, [CARRY]: 0.5, [WORK]: 0.1},
  [Role.UPGRADER]:    {[MOVE]: 0.1, [CARRY]: 0.4, [WORK]: 0.5},
  [Role.REPAIRER]:    {[MOVE]: 0.3, [CARRY]: 0.3, [WORK]: 0.4},
  [Role.BUILDER]:     {[MOVE]: 0.3, [CARRY]: 0.3, [WORK]: 0.4}
}

export function run(creep: Creep): void {
    if (creep.memory.pauseRole) {
        return;
    }

    // Self-harvest energy
    if (creep.memory.needEnergy && creep.store.getFreeCapacity() > 0 &&
        _.filter(Game.creeps, c => c.memory.role === Role.CARRIER).length <= 0) {
        const target: Source | null = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (target && creep.harvest(target) === ERR_NOT_IN_RANGE) creep.travelTo(target);

        return;
    }

    // Any creeps repair damaged structures in their range
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        const damagedStructures = _.filter(creep.pos.findInRange(FIND_MY_STRUCTURES,  3), s => s.hits < s.hitsMax);
        if (damagedStructures.length > 0) {
            creep.repair(creep.pos.findClosestByRange(damagedStructures) as Structure);

            return;
        }
    }

    // Assign creep task and run it
    const creepTasks = RoleTasks[creep.memory.role];
    if (!creep.memory.task) {
        creep.memory.taskIndex = 0;
        creep.memory.task = creepTasks[0][0];
    }
    switch (creep.runTask(creep.memory.task)) {
        case TaskStatus.COMPLETED:
            creep.memory.taskIndex += 1;
            if (!creepTasks[creep.memory.taskIndex]) creep.memory.taskIndex = 0;
            creep.memory.task = creepTasks[creep.memory.taskIndex][0];
            break;
        case TaskStatus.FAILED:
            let nextSubTaskIndex = _.indexOf(creepTasks[creep.memory.taskIndex], creep.memory.task)+1;
            if (!creepTasks[creep.memory.taskIndex][nextSubTaskIndex]) nextSubTaskIndex = 0;
            creep.memory.task = creepTasks[creep.memory.taskIndex][nextSubTaskIndex]
            break;
    }

    if (Memory.debug.drawRoles) {
        creep.room.visual.text(creep.memory.role.substr(0, 1), creep.pos, {
            font: 0.25,
            color: "#85ae89",
            stroke: "#000000",
            strokeWidth: 0.1
        });
    }
}
