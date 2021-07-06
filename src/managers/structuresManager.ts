// export function run(tower: Tower): void {
//    const towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
//         filter: { structureType: STRUCTURE_TOWER }
//    });

//    for(const tower of towers) {
//        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//            filter: (s) => s.hits < s.hitsMax
//        });
//        if(closestDamagedStructure) {
//            tower.repair(closestDamagedStructure);
//        }
//        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//        if(closestHostile) {
//            tower.attack(closestHostile);
//        }
//    }
// }
