export enum IncidentStatus {
  OPEN = "OPEN",
  RESOLVED = "RESOLVED",
}

export type Incident = {
  id: string;
  monitorId: string;
  startedAt: string;
  endedAt: string | null;
  status: IncidentStatus;
  triggerReason: string;
  monitorName: string;
};

export type IncidentState = {
  incidents: Incident[];
};
