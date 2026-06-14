"use client";

import { useState } from "react";
import { IncidentState } from "./types";
import IncidentList from "@/components/IncidentList";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

const IncidentClient = ({ initialIncidentState }: { initialIncidentState: IncidentState }) => {
  const [liveIncidentState, setLiveIncidentState] = useState(initialIncidentState);

  useRealtimeSubscription((data) => {
    setLiveIncidentState((prev) => {
      if (data.type === "incident.created") {
        return {
          incidents: [
            ...prev.incidents,
            {
              ...data,
            },
          ],
        };
      }

      if (data.type === "incident.resolved") {
        return {
          ...prev,
          incidents: prev.incidents.map((incident) => {
            return incident.id === data.id
              ? {
                  ...incident,
                  endedAt: data.endedAt,
                  status: data.status,
                }
              : incident;
          }),
        };
      }
      return prev;
    });
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-xl font-semibold tracking-tight">Incidents</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          View downtime incidents across your monitors.
        </p>
      </div>
      <IncidentList state={liveIncidentState} />
    </div>
  );
};

export default IncidentClient;
