import { MonitorStatus } from "../monitor/types";

export type StatusPageMonitor = {
  id: string;
  name: string;
  url: string;
  method: string;
  interval: number;
  timeout: number;
  lastStatus: MonitorStatus;
  consecutiveFailures: number;
  consecutiveSuccesses: number;
  createdAt: string;
  userId: string;
  statusPageId: string;
};

export type StatusPage = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  userId: string;
  monitors: StatusPageMonitor[];
};

export type StatusPageState = {
  statusPages: StatusPage[];
  error?: string | null;
  lastAction?: StatusPageActionIntent;
  success?: boolean;
};

export type StatusPageModalState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; statusPage: StatusPage };

export enum StatusPageActionIntent {
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
}
