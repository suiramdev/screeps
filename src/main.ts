import { ErrorMapper } from "utils/ErrorMapper";

import * as memoryManager from "managers/memoryManager";
import * as rolesManager from "managers/rolesManager";
import * as spawnManager from "managers/spawnManager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    memoryManager.run();
    spawnManager.run();

    for (let creepName in Game.creeps) {
        let creep: Creep = Game.creeps[creepName];

        rolesManager.run(creep);
    }
});
