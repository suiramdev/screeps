import { ErrorMapper } from "utils/ErrorMapper";
import "utils/Traveler";
import "utils/roomVisual";
import "utils/room";

import * as memoryManager from "managers/memoryManager";
import * as rolesManager from "managers/rolesManager";
import * as spawnManager from "managers/spawnManager";
import * as structuresManager from "managers/structuresManager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

export const loop = ErrorMapper.wrapLoop(() => {
    memoryManager.run();
    spawnManager.run();
    for (const creepHash in Game.creeps) {
        const creep: Creep = Game.creeps[creepHash];

        rolesManager.run(creep);
    }

    const towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER)

    for (const tower of towers) {
        structuresManager.run(tower as StructureTower);
    }
});
