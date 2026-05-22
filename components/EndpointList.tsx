import {
  NotificationEndpoint,
  NotificationUIState,
} from "@/app/(signed)/notifications/types";
import { formatEvents } from "@/app/(signed)/notifications/labels";
import ChannelBadge from "@/components/ChannelBadge";
import EnabledBadge from "@/components/EnabledBadge";

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const getDestination = (endpoint: NotificationEndpoint) => {
  if (endpoint.channel === "EMAIL") {
    return String(endpoint.config.email ?? "—");
  }
  const url = endpoint.config.webhookUrl;
  if (typeof url !== "string") return "—";
  return url.length > 48 ? `${url.slice(0, 45)}…` : url;
};

const resolveMonitorLabel = (
  monitorId: string | null,
  monitors: NotificationUIState["monitors"]
) => {
  if (!monitorId) return "All monitors";
  const monitor = monitors.find((m) => m.id === monitorId);
  if (!monitor) return monitorId;
  return monitor.name || monitor.url;
};

const EndpointList = ({
  state,
  onAddRule,
}: {
  state: NotificationUIState;
  onAddRule: (endpointId: string) => void;
}) => {
  if (state.endpoints.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
        <p className="text-sm font-medium text-foreground">
          No notification endpoints yet
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add an endpoint to define where alerts are sent, then attach rules for
          when to notify.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.endpoints.map((endpoint) => (
        <article
          key={endpoint.id}
          className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border bg-muted/30 px-4 py-4 sm:px-5">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <ChannelBadge channel={endpoint.channel} />
                <span className="text-xs text-muted-foreground">
                  Added {formatDate(endpoint.createdAt)}
                </span>
              </div>
              <p className="truncate text-sm font-medium text-foreground">
                {getDestination(endpoint)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAddRule(endpoint.id)}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Add rule
            </button>
          </div>

          <div className="px-4 py-3 sm:px-5">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Rules
            </h3>
            {endpoint.rules.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">
                No rules for this endpoint. Add a rule to choose which events
                trigger alerts.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        Scope
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        Events
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {endpoint.rules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-muted/40">
                        <td className="px-3 py-2.5 align-top font-medium text-foreground">
                          {resolveMonitorLabel(rule.monitorId, state.monitors)}
                        </td>
                        <td className="px-3 py-2.5 align-top text-muted-foreground">
                          {formatEvents(rule.events)}
                        </td>
                        <td className="px-3 py-2.5 align-top">
                          <EnabledBadge enabled={rule.enabled} />
                        </td>
                        <td className="px-3 py-2.5 align-top text-xs text-muted-foreground">
                          {formatDate(rule.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default EndpointList;
