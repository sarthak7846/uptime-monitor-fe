import { apiFetch } from "@/lib/api";
import StatusPageClient from "./StatusPageClient";
import { StatusPageState } from "./types";

const StatusPage = async () => {
  const [statusPages, monitors] = await Promise.all([
    apiFetch("/status-page"),
    apiFetch("/monitor/all"),
  ]);

  const initialState: StatusPageState = {
    statusPages,
  };

  return <StatusPageClient initialState={initialState} monitors={monitors} />;
};

export default StatusPage;
