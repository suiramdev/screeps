interface Memory {
    debug: any
}

interface Room {
    configuration(): any;
    neededRoles(): string[];
    closestSpawns(): StructureSpawn[];
    sourceStorages(): StructureStorage[];
}

interface RoomVisual {
    speech(pos: RoomPosition, text: string): any;
}

interface Creep {
    runTask(task: any): number;
    runRole(role: any): void;
    speech(message: string): void;
}

interface CreepMemory {
    role: string;
    task: string;
    room: string;
    needEnergy?: boolean;
    pauseRole?: boolean;
    target?: string;
}
