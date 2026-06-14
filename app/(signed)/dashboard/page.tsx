import { apiFetch } from "@/lib/api";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  const [monitors, incidents, endpoints] = await Promise.all([
    apiFetch("/monitor/all"),
    apiFetch("/incident/all"),
    apiFetch("/notification/endpoints"),
  ]);
  return <DashboardClient initialDashboardState={{ monitors, incidents, endpoints }} />;
};

export default DashboardPage;
