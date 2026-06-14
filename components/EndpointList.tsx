import { NotificationEndpoint, NotificationUIState } from "@/app/(signed)/notifications/types";
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
      <div className="border-border bg-card rounded-xl border border-dashed px-6 py-14 text-center">
        <p className="text-foreground text-sm font-medium">No notification endpoints yet</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Add an endpoint to define where alerts are sent, then attach rules for when to notify.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.endpoints.map((endpoint) => (
        <article
          key={endpoint.id}
          className="border-border bg-card overflow-hidden rounded-xl border shadow-sm"
        >
          <div className="border-border bg-muted/30 flex flex-wrap items-start justify-between gap-4 border-b px-4 py-4 sm:px-5">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <ChannelBadge channel={endpoint.channel} />
                <span className="text-muted-foreground text-xs">
                  Added {formatDate(endpoint.createdAt)}
                </span>
              </div>
              <p className="text-foreground truncate text-sm font-medium">
                {getDestination(endpoint)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAddRule(endpoint.id)}
              className="border-input bg-background text-foreground hover:bg-muted focus-visible:ring-ring inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Add rule
            </button>
          </div>

          <div className="px-4 py-3 sm:px-5">
            <h3 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              Rules
            </h3>
            {endpoint.rules.length === 0 ? (
              <p className="text-muted-foreground py-4 text-sm">
                No rules for this endpoint. Add a rule to choose which events trigger alerts.
              </p>
            ) : (
              <div className="border-border overflow-x-auto rounded-lg border">
                <table className="divide-border min-w-full divide-y text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th
                        scope="col"
                        className="text-muted-foreground px-3 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                      >
                        Scope
                      </th>
                      <th
                        scope="col"
                        className="text-muted-foreground px-3 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                      >
                        Events
                      </th>
                      <th
                        scope="col"
                        className="text-muted-foreground px-3 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="text-muted-foreground px-3 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                      >
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border bg-card divide-y">
                    {endpoint.rules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-muted/40">
                        <td className="text-foreground px-3 py-2.5 align-top font-medium">
                          {resolveMonitorLabel(rule.monitorId, state.monitors)}
                        </td>
                        <td className="text-muted-foreground px-3 py-2.5 align-top">
                          {formatEvents(rule.events)}
                        </td>
                        <td className="px-3 py-2.5 align-top">
                          <EnabledBadge enabled={rule.enabled} />
                        </td>
                        <td className="text-muted-foreground px-3 py-2.5 align-top text-xs">
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
