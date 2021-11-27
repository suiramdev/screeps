Room.prototype.sourceStorages = function () {
    return this.find(FIND_STRUCTURES, {
        filter: s => (s.structureType === STRUCTURE_STORAGE || s.structureType ===  STRUCTURE_CONTAINER) && s.pos.findInRange(FIND_SOURCES, 2).length > 0
    }) as StructureStorage[];
}

export function roomLink(roomName: string, color: string = "#70a5ff") {
    const shardName = Game.shard.name;
    return `<a href="#!/room/${shardName}/${roomName}"><span style="color: ${color};">${roomName}</span></a>`;
}
