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

    let taskStatus = creep.runTask(creep.memory.roleTask);
    if (taskStatus == TaskStatus.COMPLETED) {
        const currentTaskIndex = RoleTasks[creep.memory.role].indexOf(creep.memory.roleTask);
        const nextTaskIndex = currentTaskIndex + 1 > RoleTasks[creep.memory.role].length ? 0 : currentTaskIndex + 1
        creep.memory.roleTask = RoleTasks[creep.memory.role][nextTaskIndex];
    }
}
