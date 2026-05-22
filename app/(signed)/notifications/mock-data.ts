import { NotificationUIState } from "./types";

export const initialNotificationUIState: NotificationUIState = {
  monitors: [
    {
      id: "mon-1",
      name: "Marketing site",
      url: "https://example.com",
    },
    {
      id: "mon-2",
      name: "API health",
      url: "https://api.example.com/health",
    },
  ],
  endpoints: [
    {
      id: "ep-1",
      channel: "EMAIL",
      config: { email: "alerts@example.com" },
      createdAt: "2026-05-20T10:00:00.000Z",
      rules: [
        {
          id: "rule-1",
          endpointId: "ep-1",
          monitorId: null,
          events: ["monitor.down", "monitor.up"],
          enabled: true,
          createdAt: "2026-05-20T10:05:00.000Z",
        },
        {
          id: "rule-2",
          endpointId: "ep-1",
          monitorId: "mon-2",
          events: ["monitor.down"],
          enabled: true,
          createdAt: "2026-05-21T14:30:00.000Z",
        },
      ],
    },
    {
      id: "ep-2",
      channel: "SLACK",
      config: {
        webhookUrl: "https://hooks.slack.com/services/T00/B00/xxxxxxxx",
      },
      createdAt: "2026-05-22T08:15:00.000Z",
      rules: [],
    },
  ],
};
