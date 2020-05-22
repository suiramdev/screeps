import { Task, TaskStatus } from "./tasksManager";

export enum Role {
    NONE = "NONE",
    HARVESTER = "HARVESTER",
    UPGRADER = "UPGRADER",
    BUILDER = "BUILDER"
}

interface BodyParts {
    [key: string]: BodyPartConstant[]
}

export const BodyParts: BodyParts = {
    [Role.NONE]: [MOVE, CARRY, WORK],
    [Role.HARVESTER]: [MOVE, CARRY, WORK],
    [Role.UPGRADER]: [MOVE, CARRY, WORK],
    [Role.BUILDER]: [MOVE, CARRY, WORK]
}

interface RoleTasks {
    [key: string]: any
}

export const RoleTasks: RoleTasks = {
    [Role.NONE]: [Task.IDLE],
    [Role.HARVESTER]: [Task.HARVEST, Task.STORE],
    [Role.UPGRADER]: [Task.UPGRADE, Task.PICKUP],
    [Role.BUILDER]: [Task.BUILD, Task.PICKUP]
}

export function run(creep: Creep): void {
    if (!creep.memory.pauseRole) {
        if (creep.memory.roleTaskStatus == TaskStatus.COMPLETED) {
            const currentTaskIndex = RoleTasks[creep.memory.role].indexOf(creep.memory.roleTask);
            const nextTaskIndex = currentTaskIndex + 1 > RoleTasks[creep.memory.role].length ? 0 : currentTaskIndex + 1
            creep.memory.roleTask = RoleTasks[creep.memory.role][nextTaskIndex];
            creep.memory.roleTaskStatus = TaskStatus.OK;
        } else {
            creep.memory.roleTaskStatus = creep.runTask(creep.memory.roleTask);
        }
    }
}

Creep.prototype.setRole = function (role: Role) {
    this.memory.role = role;
    this.memory.roleTask = RoleTasks[role][0];
    this.memory.roleTaskStatus = TaskStatus.OK;
}
