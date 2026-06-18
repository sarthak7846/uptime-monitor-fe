import { apiFetch } from "@/lib/api";
import StatusPageClient from "./StatusPageClient";
import { StatusPageState } from "./types";

const StatusPage = async () => {
  const statusPages = await apiFetch("/status-page");
  const initialState: StatusPageState = {
    statusPages,
  };

  return <StatusPageClient initialState={initialState} />;
};

export default StatusPage;
