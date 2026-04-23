export type Monitor = {
    id: string;
    name: string;
    url: string;
    method: string;
    lastStatus: MonitorStatus;
    interval: number;
    consecutiveFailures: number;
    consecutiveSuccesses: number;
    createdAt: Date;
    userId: string;
    // lastChecked: string;
    timeout: number
};

export type MonitorState = {
    monitors: Monitor[];
    error?: string | null;
    lastAction?: MonitorActionIntent;
    success?: boolean;
}

export type ModalState = { mode: 'closed' } | { mode: 'create' } | { mode: 'edit'; monitor: Monitor }

export enum MonitorActionIntent {
    CREATE = 'create',
    DELETE = 'delete',
    UPDATE = 'update'
}
export type HttpMethod = "GET" | "POST" | "HEAD";
export type MonitorStatus = "PENDING" | "UP" | "DOWN";