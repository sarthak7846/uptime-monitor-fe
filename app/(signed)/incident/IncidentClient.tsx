'use client';

import { IncidentState } from "./types";
import IncidentList from "@/components/IncidentList";

const IncidentClient = ({
    initialIncidentState,
}: {
    initialIncidentState: IncidentState;
}) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    Incidents
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    View downtime incidents across your monitors.
                </p>
            </div>

            <IncidentList state={initialIncidentState} />
        </div>
    );
};

export default IncidentClient;
