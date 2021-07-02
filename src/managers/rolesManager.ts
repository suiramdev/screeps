import {Task, TaskStatus} from "./tasksManager";

export enum Role {
    HARVESTER = "HARVESTER",
    CARRIER = "CARRIER"
}

export const RoleBodyParts: Record<string, BodyPartConstant[]> = {
    [Role.HARVESTER]: [MOVE, WORK, WORK]
}

export const RoleTasks: Record<string, string[]> = {
    [Role.HARVESTER]: [Task.HARVEST],
}

export function run(creep: Creep): void {
    if (creep.memory.pauseRole) {
        return;
    }

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
