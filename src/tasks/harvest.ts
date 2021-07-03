import {TaskStatus} from "managers/tasksManager";

export function run(creep: Creep): TaskStatus {
    const room = Game.rooms[creep.memory.room];
    let targetStorage: StructureStorage = room.find(FIND_STRUCTURES, { filter: s => s.id === creep.memory.target })[0] as StructureStorage;
    let targetSource: Source;
    if (!targetStorage) {
        for (const storage of room.sourceStorages()) {
            if (_.filter(Game.creeps, c => c.memory.target === storage.id).length > 0) continue;

            targetStorage = storage;
            creep.memory.target = storage.id;
            break;
        }
    }
    if (!targetStorage) return TaskStatus.FAILED;

    targetSource = targetStorage.pos.findInRange(FIND_SOURCES, 2)[0];

    if (creep.pos !== targetStorage.pos) creep.moveTo(targetStorage);
    creep.harvest(targetSource);

    creep.speech("⛏️");

    return TaskStatus.WORKING;
}
