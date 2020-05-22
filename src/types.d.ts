interface StructureSpawn {
    configuration(): any;
}

interface SpawnMemory {
    needToSpawn: boolean;
}

interface Creep {
    runTask(task: any): number;
    setRole(role: any): void;
}

interface CreepMemory {
    defaultRole: string;
    role: string;
    roleTask: number;
    roleTaskStatus: number;
    pauseRole: boolean;
}
