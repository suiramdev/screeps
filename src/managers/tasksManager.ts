import * as taskIdle from "tasks/idle";
import * as taskHarvest from "tasks/harvest";

export enum Task {
    IDLE = "idle",
    HARVEST = "harvest"
}

export enum TaskStatus {
    FAILED,
    WORKING,
    COMPLETED
}

Creep.prototype.runTask = function (task: Task): TaskStatus {
    switch (task) {
        case Task.HARVEST:
            return taskHarvest.run(this);
        default:
            return taskIdle.run(this);
    }
}
