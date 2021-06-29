interface Memory {
  debug: any
}

interface Room {
    configuration(): any;
    getNeededRoles(): any;
}

interface RoomVisual {
  speech(pos: RoomPosition, text: string): any;
}

interface SpawnMemory {
    needToSpawn: boolean;
}

interface Creep {
    runTask(task: any): number;
    runRole(role: any): void;
    speech(message: string): void;
}

interface CreepMemory {
    role: string;
    roleTask: number;
    pauseRole?: boolean;
    target?: string;
}
