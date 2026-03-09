import MonitorClient from "./MonitorClient";
import { apiFetch } from "@/lib/api";
import { CreateMonitorState } from "./types";

const MonitorPage = async () => {
  const res = await apiFetch('/monitor/all');
  const monitors = res;
  const initialMonitorState: CreateMonitorState = {
    monitors
  };

  return (
    <MonitorClient initialMonitorState={initialMonitorState} />
  )
}

export default MonitorPage