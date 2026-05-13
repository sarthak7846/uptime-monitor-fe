import MonitorClient from "./MonitorClient";
import { apiFetch } from "@/lib/api";
import { MonitorState } from "./types";

const MonitorPage = async () => {
  const res = await apiFetch('/monitor/all');
  const monitors = res;
  const initialMonitorState: MonitorState = {
    monitors
  };

  return (
    <MonitorClient initialMonitorState={initialMonitorState} />
  )
}

export default MonitorPage