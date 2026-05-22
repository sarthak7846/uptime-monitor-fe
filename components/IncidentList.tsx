import { Incident, IncidentState, IncidentStatus } from "@/app/(signed)/incident/types";

const getStatusStyles = (status: IncidentStatus) => {
    switch (status) {
        case IncidentStatus.OPEN:
            return "border-amber-200/80 bg-amber-50 text-amber-800 ring-amber-500/20 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25";
        case IncidentStatus.RESOLVED:
            return "border-emerald-200/80 bg-emerald-50 text-emerald-800 ring-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25";
        default:
            return "border-border bg-muted text-muted-foreground ring-border";
    }
};

const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
        case IncidentStatus.OPEN:
            return "bg-amber-500";
        case IncidentStatus.RESOLVED:
            return "bg-emerald-500";
        default:
            return "bg-muted-foreground";
    }
};

const IncidentStatusBadge = ({ status }: { status: IncidentStatus }) => (
    <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${getStatusStyles(
            status
        )}`}
    >
        <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${getStatusColor(status)}`}
            aria-hidden
        />
        <span>{status}</span>
    </span>
);

const formatDate = (value: string | null) => {
    if (!value) return "—";
    return new Date(value).toLocaleString();
};

const IncidentList = ({ state }: { state: IncidentState }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="min-w-full divide-y divide-border text-sm">
                <thead className="bg-muted/50">
                    <tr>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                        >
                            Monitor
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                        >
                            Started
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                        >
                            Ended
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                        >
                            Trigger Reason
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                    {state.incidents.map((incident) => (
                        <tr key={incident.id} className="hover:bg-muted/40">
                            <td className="px-4 py-3 align-top">
                                <div className="flex flex-col">
                                    <span className="font-medium text-foreground">
                                        {incident.monitorId}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        ID: {incident.id}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3 align-top">
                                <IncidentStatusBadge status={incident.status} />
                            </td>
                            <td className="px-4 py-3 align-top">
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(incident.startedAt)}
                                </span>
                            </td>
                            <td className="px-4 py-3 align-top">
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(incident.endedAt)}
                                </span>
                            </td>
                            <td className="px-4 py-3 align-top">
                                <span className="text-xs text-muted-foreground">
                                    {incident.triggerReason}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {state.incidents.length === 0 && (
                <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                    No incidents recorded yet. Incidents appear when a monitor goes down.
                </div>
            )}
        </div>
    );
};

export default IncidentList;
