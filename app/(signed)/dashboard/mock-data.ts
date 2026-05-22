import { Incident, IncidentStatus } from "@/app/(signed)/incident/types";
import { Monitor, MonitorStatus } from "@/app/(signed)/monitor/types";
import { initialNotificationUIState } from "@/app/(signed)/notifications/mock-data";

export const dashboardMonitors: Monitor[] = [
  {
    id: "mon-1",
    name: "Marketing site",
    url: "https://example.com",
    method: "GET",
    lastStatus: "UP" as MonitorStatus,
    interval: 60000,
    timeout: 5000,
    consecutiveFailures: 0,
    consecutiveSuccesses: 42,
    createdAt: new Date("2026-04-01"),
    userId: "user-1",
  },
  {
    id: "mon-2",
    name: "API health",
    url: "https://api.example.com/health",
    method: "GET",
    lastStatus: "DOWN" as MonitorStatus,
    interval: 30000,
    timeout: 3000,
    consecutiveFailures: 3,
    consecutiveSuccesses: 0,
    createdAt: new Date("2026-04-05"),
    userId: "user-1",
  },
  {
    id: "mon-3",
    name: "Docs portal",
    url: "https://docs.example.com",
    method: "HEAD",
    lastStatus: "UP" as MonitorStatus,
    interval: 120000,
    timeout: 8000,
    consecutiveFailures: 0,
    consecutiveSuccesses: 18,
    createdAt: new Date("2026-05-10"),
    userId: "user-1",
  },
  {
    id: "mon-4",
    name: "Staging app",
    url: "https://staging.example.com",
    method: "GET",
    lastStatus: "PENDING" as MonitorStatus,
    interval: 60000,
    timeout: 5000,
    consecutiveFailures: 0,
    consecutiveSuccesses: 0,
    createdAt: new Date("2026-05-18"),
    userId: "user-1",
  },
];

export const dashboardIncidents: Incident[] = [
  {
    id: "inc-1",
    monitorId: "mon-2",
    startedAt: "2026-05-22T09:12:00.000Z",
    endedAt: null,
    status: IncidentStatus.OPEN,
    triggerReason: "HTTP 503 from health check",
  },
  {
    id: "inc-2",
    monitorId: "mon-1",
    startedAt: "2026-05-21T16:40:00.000Z",
    endedAt: "2026-05-21T17:05:00.000Z",
    status: IncidentStatus.RESOLVED,
    triggerReason: "Connection timeout",
  },
  {
    id: "inc-3",
    monitorId: "mon-2",
    startedAt: "2026-05-19T11:00:00.000Z",
    endedAt: "2026-05-19T11:45:00.000Z",
    status: IncidentStatus.RESOLVED,
    triggerReason: "HTTP 502 Bad Gateway",
  },
];

export const dashboardNotifications = initialNotificationUIState;
