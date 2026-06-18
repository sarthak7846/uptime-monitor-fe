import { apiFetch } from "@/lib/api";
import NotificationClient from "./NotificationClient";
import { NotificationUIState } from "./types";

const NotificationsPage = async () => {
  const [endpoints, monitors] = await Promise.all([
    apiFetch("/notification/endpoints"),
    apiFetch("/monitor/all"),
  ]);

  const initialNotificationUIState: NotificationUIState = {
    endpoints,
    monitors,
  };

  return <NotificationClient initialNotificationUIState={initialNotificationUIState} />;
};

export default NotificationsPage;
