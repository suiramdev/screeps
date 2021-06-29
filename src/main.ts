import { ErrorMapper } from "utils/ErrorMapper";

import "includes/roomVisual";
import * as memoryManager from "managers/memoryManager";
import * as rolesManager from "managers/rolesManager";
import * as spawnManager from "managers/spawnManager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    memoryManager.run();
    spawnManager.run();

    for (const creepName in Game.creeps) {
        const creep: Creep = Game.creeps[creepName];

        rolesManager.run(creep);
    }
});
