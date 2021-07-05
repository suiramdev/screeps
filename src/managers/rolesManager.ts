import {Task, TaskStatus} from "./tasksManager";

export enum Role {
    HARVESTER = "HARVESTER",
    CARRIER = "CARRIER",
    UPGRADER = "UPGRADER"
}

export const RoleBodyParts: Record<string, BodyPartConstant[]> = {
    [Role.HARVESTER]: [MOVE, WORK, WORK],
    [Role.CARRIER]: [MOVE, MOVE, CARRY, CARRY],
    [Role.UPGRADER]: [MOVE, CARRY, WORK, WORK]
}

export const RoleTasks: Record<string, string[]> = {
    [Role.HARVESTER]: [Task.HARVEST],
    [Role.CARRIER]: [Task.CARRY, Task.SPREAD_ENERGY],
    [Role.UPGRADER]: [Task.UPGRADE]
}

export function run(creep: Creep): void {
    if (creep.memory.pauseRole) {
        return;
    }

    if (creep.memory.needEnergy && creep.store.getFreeCapacity() > 0 &&
        _.filter(Game.creeps, c => c.memory.role === Role.CARRIER).length <= 0) {
        const target: Source | null = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (target && creep.harvest(target) === ERR_NOT_IN_RANGE) creep.travelTo(target);

        return;
    }

    if (!creep.memory.task) creep.memory.task = RoleTasks[creep.memory.role][0];

    const taskStatus = creep.runTask(creep.memory.task);
    if (taskStatus === TaskStatus.COMPLETED) {
        const currentTaskIndex = RoleTasks[creep.memory.role].indexOf(creep.memory.task);
        const nextTaskIndex = currentTaskIndex + 1 > RoleTasks[creep.memory.role].length ? 0 : currentTaskIndex + 1
        creep.memory.task = RoleTasks[creep.memory.role][nextTaskIndex];
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
