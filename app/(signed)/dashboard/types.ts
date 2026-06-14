import { Monitor } from "../monitor/types";
import { Incident } from "../incident/types";
import { NotificationEndpoint } from "../notifications/types";

export interface DashboardState {
  monitors: Monitor[];
  incidents: Incident[];
  endpoints: NotificationEndpoint[];
}
