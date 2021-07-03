Room.prototype.sourceStorages = function () {
    return this.find(FIND_STRUCTURES, {
        filter: s => (s.structureType === STRUCTURE_STORAGE || s.structureType ===  STRUCTURE_CONTAINER) && s.pos.findInRange(FIND_SOURCES, 2).length > 0
    }) as StructureStorage[];
}
