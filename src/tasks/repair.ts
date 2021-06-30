import {TaskStatus} from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
      return TaskStatus.COMPLETED;
    }

    const structures = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.hits/structure.hitsMax < 0.5
    });
    const target = creep.pos.findClosestByPath(structures);

    if (target) {
      creep.speech("🔨");

      if (creep.repair(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      return TaskStatus.FAILED;
    }

    return TaskStatus.OK;
}
