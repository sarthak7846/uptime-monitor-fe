import { NotificationEventName } from "./types";

export const EVENT_LABELS: Record<NotificationEventName, string> = {
  "monitor.down": "Monitor went down",
  "monitor.up": "Monitor recovered",
};

export const formatEvents = (events: NotificationEventName[]) =>
  events.map((e) => EVENT_LABELS[e]).join(", ");
