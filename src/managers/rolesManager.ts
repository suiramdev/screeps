import { Task, TaskStatus } from "./tasksManager";

export enum Role {
    HARVESTER = "HARVESTER",
    UPGRADER = "UPGRADER",
    BUILDER = "BUILDER"
}

export const RoleBodyParts: Record<string, BodyPartConstant[]> = {
    [Role.HARVESTER]: [MOVE, CARRY, WORK],
    [Role.UPGRADER]: [MOVE, CARRY, WORK],
    [Role.BUILDER]: [MOVE, CARRY, WORK]
}

export const RoleTasks: Record<string, any> = {
    [Role.HARVESTER]: [Task.HARVEST, Task.STORE],
    [Role.UPGRADER]: [Task.UPGRADE, Task.PICKUP],
    [Role.BUILDER]: [Task.BUILD, Task.PICKUP]
}

export function run(creep: Creep): void {
    if (creep.memory.pauseRole) { return; }

    const taskStatus = creep.runTask(creep.memory.roleTask);
    if (taskStatus === TaskStatus.COMPLETED) {
        const currentTaskIndex = RoleTasks[creep.memory.role].indexOf(creep.memory.roleTask);
        const nextTaskIndex = currentTaskIndex + 1 > RoleTasks[creep.memory.role].length ? 0 : currentTaskIndex + 1
        creep.memory.roleTask = RoleTasks[creep.memory.role][nextTaskIndex];
    }

    if (Memory.debug.drawRoles === 1) {
      creep.room.visual.text(creep.memory.role.substr(0, 1), creep.pos, {
        font: 0.25,
        color: "#85ae89",
        stroke: "#000000",
        strokeWidth: 0.1
      });
    }
}
