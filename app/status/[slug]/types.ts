export type HistoryEntry = {
  date: string;
  uptime: number;
};

export type UptimeSummary = {
  from: string;
  to: string;
  uptimePercentage: number;
  incidentCount: number;
};

export type PublicMonitor = {
  id: string;
  name: string;
  status: "UP" | "DOWN" | "PENDING";
  uptime90Days: UptimeSummary;
  history: HistoryEntry[];
};

export type PublicStatusPageData = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  userId: string;
  monitors: PublicMonitor[];
  overallStatus: "operational" | "degraded" | "down";
};
