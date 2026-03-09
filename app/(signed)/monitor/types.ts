export type Monitor = {
    id: number;
    name: string;
    url: string;
    method: string;
    lastStatus: MonitorState;
    interval: number;
    consecutiveFailures: number;
    consecutiveSuccesses: number;
    createdAt: Date;
    userId: string;
    // lastChecked: string;
    timeout: number
};

export type CreateMonitorState = {
    monitors: Monitor[];
    error?: string | null;
}

export type HttpMethod = "GET" | "POST" | "HEAD";
export type MonitorState = "PENDING" | "UP" | "DOWN";

export type CreateMonitorForm = {
    name: string;
    url: string;
    method: HttpMethod;
    lastStatus?: MonitorState;
    interval: number;
    timeout: number;
};