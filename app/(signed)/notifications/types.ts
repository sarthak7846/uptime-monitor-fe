export type NotificationChannel = "EMAIL" | "SLACK" | "WEBHOOK";

export type NotificationEventName = "monitor.down" | "monitor.up";

export interface NotificationRule {
  id: string;
  monitorId: string | null;
  endpointId: string;
  events: NotificationEventName[];
  enabled: boolean;
  createdAt: string;
}

export interface NotificationEndpoint {
  id: string;
  channel: NotificationChannel;
  config: Record<string, unknown>;
  createdAt: string;
  ruleCount: number;
  /** Present when fully loaded (e.g. dashboard). Omitted on the notifications list. */
  rules?: NotificationRule[];
}

export interface MonitorOption {
  id: string;
  name: string;
  url: string;
}

export interface NotificationUIState {
  endpoints: NotificationEndpoint[];
  monitors: MonitorOption[];
}

export type RulesLoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; rules: NotificationRule[] }
  | { status: "error"; message: string };

export type EndpointModalState = { mode: "closed" } | { mode: "create" };

export type RuleModalState = { mode: "closed" } | { mode: "create"; endpointId: string };
