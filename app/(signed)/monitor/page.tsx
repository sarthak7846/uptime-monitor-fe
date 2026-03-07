import MonitorClient from "./MonitorClient";
import { apiFetch } from "@/lib/api";

const MonitorPage = async () => {
  const res = await apiFetch('/monitor/all');
  const monitors = await res.json();

  return (
    <MonitorClient initialMonitors={monitors}/>
  )
}

export default MonitorPage