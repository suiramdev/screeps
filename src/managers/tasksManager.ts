import * as taskIdle from "tasks/idle";
import * as taskHarvest from "tasks/harvest";
import * as taskPickup from "tasks/pickup";
import * as taskStore from "tasks/store";
import * as taskUpgrade from "tasks/upgrade";
import * as taskBuild from "tasks/build";
import * as taskRepair from "tasks/repair";

export enum Task {
    IDLE,
    HARVEST,
    PICKUP,
    STORE,
    UPGRADE,
    BUILD,
    REPAIR
}

export enum TaskStatus {
    FAILED,
    OK,
    COMPLETED
}

Creep.prototype.runTask = function (task: Task): TaskStatus {
    switch (task) {
        case Task.HARVEST:
            return taskHarvest.run(this);
        case Task.PICKUP:
            return taskPickup.run(this);
        case Task.STORE:
            return taskStore.run(this);
        case Task.UPGRADE:
            return taskUpgrade.run(this);
        case Task.BUILD:
            return taskBuild.run(this);
        case Task.REPAIR:
            return taskRepair.run(this);
        default:
            return taskIdle.run(this);
    }
}
