import { apiFetch } from "@/lib/api"
import IncidentClient from "./IncidentClient";
import { IncidentState } from "./types";

const IncidentPage = async () => {
  const res = await apiFetch('/incident/all');
  const incidents = res;
  const initialIncidentState: IncidentState = {
    incidents,
  };

  return (
    <IncidentClient initialIncidentState={initialIncidentState} />
  )
}

export default IncidentPage