export type Monitor = {
    id: number;
    name: string;
    url: string;
    method: string;
    lastStatus: MonitorState;
    interval: string;
    consecutiveFailures: number;
    consecutiveSuccesses: number;
    createdAt: Date;
    userId: string;
    // lastChecked: string;
    timeout: string
};



export type HttpMethod = "GET" | "POST" | "HEAD";
export type MonitorState = "PENDING" | "UP" | "DOWN";

export type CreateMonitorForm = {
    name: string;
    url: string;
    method: HttpMethod;
    lastStatus: "" | MonitorState;
    interval: number;
    timeout: number;
};