import {TaskStatus} from "managers/tasksManager";
import {Role} from "../managers/rolesManager";
import {drop} from "lodash";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getFreeCapacity() <= 0) return TaskStatus.COMPLETED;

    const room = Game.rooms[creep.memory.room];
    const droppedResources = room.find(FIND_DROPPED_RESOURCES);
    if (_.sum(droppedResources) <= 0) return TaskStatus.FAILED;

    let target: Resource|null = _.filter(droppedResources, r => r.id === creep.memory.target)[0];
    if (!target) {
        for (const resource of droppedResources) {
            if (_.filter(Game.creeps, c => c !== creep && c.memory.role === Role.CARRIER && c.memory.target === resource.id).length > 0) continue;

            target = resource;
            creep.memory.target = target.id;
        }
    }

    if (creep.pickup(target) === ERR_NOT_IN_RANGE)
        creep.travelTo(target);

    creep.speech("👌");
    console.log("pickup dropped resource");

    return TaskStatus.WORKING;
}
