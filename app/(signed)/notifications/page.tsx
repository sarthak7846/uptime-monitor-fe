import { apiFetch } from "@/lib/api";
import NotificationClient from "./NotificationClient";
import { initialNotificationUIState as mockNotificationUIState } from "./mock-data";
import { NotificationUIState } from "./types";

const NotificationsPage = async () => {
  const [endpoints, monitorsRaw] = await Promise.all([
    apiFetch("/notification/endpoints"),
    apiFetch("/monitor/all"),
  ]);

  const monitors =
    Array.isArray(monitorsRaw) && monitorsRaw.length > 0
      ? monitorsRaw
      : mockNotificationUIState.monitors;

  const initialNotificationUIState: NotificationUIState = {
    endpoints,
    monitors,
  };

  return <NotificationClient initialNotificationUIState={initialNotificationUIState} />;
};

export default NotificationsPage;
