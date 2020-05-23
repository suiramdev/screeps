interface Room {
    configuration(): any;
    getNeededRoles(): any;
}

interface SpawnMemory {
    needToSpawn: boolean;
}

interface Creep {
    runTask(task: any): number;
    runRole(role: any): void;
}

interface CreepMemory {
    role: string;
    roleTask: number;
    pauseRole?: boolean;
}
