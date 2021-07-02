import { TaskStatus } from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    creep.speech("⛏️");

    return TaskStatus.WORKING;
}
