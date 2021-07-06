export function run(tower: StructureTower): void {

    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax
    });
    if (closestDamagedStructure) tower.repair(closestDamagedStructure);
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) tower.attack(closestHostile);
}
