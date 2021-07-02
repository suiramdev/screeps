import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    return TaskStatus.WORKING;
}
