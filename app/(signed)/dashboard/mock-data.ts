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

export const dashboardNotifications = initialNotificationUIState;
