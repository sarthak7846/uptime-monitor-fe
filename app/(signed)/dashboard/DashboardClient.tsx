"use client";

import Link from "next/link";
import { IncidentStatus } from "@/app/(signed)/incident/types";
import { MonitorStatus } from "@/app/(signed)/monitor/types";
import ChannelBadge from "@/components/ChannelBadge";
import { dashboardIncidents, dashboardMonitors, dashboardNotifications } from "./mock-data";
import { DashboardState } from "./types";

const monitorStatusStyles: Record<MonitorStatus, string> = {
  UP: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  DOWN: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
};

const incidentStatusStyles: Record<IncidentStatus, string> = {
  [IncidentStatus.OPEN]:
    "border-amber-200/80 bg-amber-50 text-amber-800 ring-amber-500/20 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25",
  [IncidentStatus.RESOLVED]:
    "border-emerald-200/80 bg-emerald-50 text-emerald-800 ring-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25",
};

const formatDate = (value: string | null) => {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const resolveMonitorName = (monitorId: string) => {
  const m = dashboardMonitors.find((x) => x.id === monitorId);
  return m?.name ?? monitorId;
};

const StatCard = ({
  label,
  value,
  hint,
  href,
  accent,
}: {
  label: string;
  value: string | number;
  hint?: string;
  href: string;
  accent?: "default" | "warning" | "success" | "danger";
}) => {
  const accentBorder = {
    default: "border-border",
    warning: "border-amber-300/60 dark:border-amber-500/40",
    success: "border-emerald-300/60 dark:border-emerald-500/40",
    danger: "border-red-300/60 dark:border-red-500/40",
  }[accent ?? "default"];

  return (
    <Link
      href={href}
      className={`group bg-card hover:bg-muted/40 block rounded-xl border p-4 shadow-sm transition-colors ${accentBorder}`}
    >
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <p className="text-foreground mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {hint && (
        <p className="text-muted-foreground group-hover:text-foreground/80 mt-1 text-xs">
          {hint} →
        </p>
      )}
    </Link>
  );
};

const DashboardClient = ({ initialDashboardState }: { initialDashboardState: DashboardState }) => {
  const { monitors, incidents } = initialDashboardState;
  // const monitors = dashboardMonitors;
  // const incidents = dashboardIncidents;
  const { endpoints } = dashboardNotifications;

  const statusCounts = monitors.reduce(
    (acc, m) => {
      acc[m.lastStatus] = (acc[m.lastStatus] ?? 0) + 1;
      return acc;
    },
    {} as Record<MonitorStatus, number>
  );

  const openIncidents = incidents.filter((i) => i.status === IncidentStatus.OPEN);
  const enabledRules = endpoints.flatMap((e) => e.rules.filter((r) => r.enabled));
  const emailEndpoints = endpoints.filter((e) => e.channel === "EMAIL").length;
  const downMonitors = monitors.filter((m) => m.lastStatus === "DOWN");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Overview of monitor health, incidents, and alert configuration.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Monitors"
          value={monitors.length}
          hint="View all monitors"
          href="/monitor"
          accent={
            (statusCounts.DOWN ?? 0) > 0
              ? "danger"
              : (statusCounts.UP ?? 0) === monitors.length
                ? "success"
                : "default"
          }
        />
        <StatCard
          label="Open incidents"
          value={openIncidents.length}
          hint="View incidents"
          href="/incident"
          accent={openIncidents.length > 0 ? "warning" : "success"}
        />
        <StatCard
          label="Endpoints"
          value={endpoints.length}
          hint="Notification settings"
          href="/notifications"
        />
        <StatCard
          label="Active rules"
          value={enabledRules.length}
          hint="Manage rules"
          href="/notifications"
        />
      </section>

      {downMonitors.length > 0 && (
        <div
          role="alert"
          className="rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
        >
          <span className="font-medium">
            {downMonitors.length} monitor
            {downMonitors.length > 1 ? "s are" : " is"} down
          </span>
          : {downMonitors.map((m) => m.name).join(", ")}. Check{" "}
          <Link href="/incident" className="font-medium underline underline-offset-2">
            incidents
          </Link>{" "}
          and{" "}
          <Link href="/notifications" className="font-medium underline underline-offset-2">
            notifications
          </Link>{" "}
          if you expect alerts.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-foreground text-sm font-semibold">Monitor health</h2>
            <Link href="/monitor" className="text-primary text-xs font-medium hover:underline">
              View all
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["UP", "DOWN", "PENDING"] as MonitorStatus[]).map((status) => (
              <span
                key={status}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${monitorStatusStyles[status]}`}
              >
                {status}
                <span className="opacity-80">· {statusCounts[status] ?? 0}</span>
              </span>
            ))}
          </div>

          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <table className="divide-border min-w-full divide-y text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                    Monitor
                  </th>
                  <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {monitors.map((monitor) => (
                  <tr key={monitor.id} className="hover:bg-muted/40">
                    <td className="px-4 py-2.5">
                      <span className="text-foreground font-medium">{monitor.name}</span>
                      <p className="text-muted-foreground max-w-[200px] truncate text-xs sm:max-w-none">
                        {monitor.url}
                      </p>
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${monitorStatusStyles[monitor.lastStatus]}`}
                      >
                        {monitor.lastStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-foreground text-sm font-semibold">Recent incidents</h2>
            <Link href="/incident" className="text-primary text-xs font-medium hover:underline">
              View all
            </Link>
          </div>

          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <table className="divide-border min-w-full divide-y text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                    Monitor
                  </th>
                  <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                    Status
                  </th>
                  <th className="text-muted-foreground px-4 py-2.5 text-left text-xs font-medium tracking-wide uppercase">
                    Started
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {incidents.slice(0, 4).map((incident) => (
                  <tr key={incident.id} className="hover:bg-muted/40">
                    <td className="text-foreground px-4 py-2.5 font-medium">
                      {resolveMonitorName(incident.monitorId)}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold uppercase ring-1 ring-inset ${incidentStatusStyles[incident.status]}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${incident.status === IncidentStatus.OPEN ? "bg-amber-500" : "bg-emerald-500"}`}
                          aria-hidden
                        />
                        {incident.status}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-4 py-2.5 text-xs">
                      {formatDate(incident.startedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {incidents.length === 0 && (
              <p className="text-muted-foreground px-4 py-8 text-center text-sm">
                No incidents recorded.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-foreground text-sm font-semibold">Notification coverage</h2>
          <Link href="/notifications" className="text-primary text-xs font-medium hover:underline">
            Manage notifications
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-border bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Email endpoints
            </p>
            <p className="text-foreground mt-2 text-2xl font-semibold">{emailEndpoints}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Delivered when monitors change state
            </p>
          </div>
          <div className="border-border bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Enabled rules
            </p>
            <p className="text-foreground mt-2 text-2xl font-semibold">{enabledRules.length}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Across {endpoints.length} endpoint
              {endpoints.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="border-border bg-card rounded-xl border p-4">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Monitors without rules
            </p>
            <p className="text-foreground mt-2 text-2xl font-semibold">
              {Math.max(
                0,
                monitors.length -
                  new Set(
                    enabledRules.map((r) => r.monitorId).filter((id): id is string => id != null)
                  ).size
              )}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              May only receive global (all monitors) alerts
            </p>
          </div>
        </div>

        <div className="border-border bg-card overflow-hidden rounded-xl border">
          <ul className="divide-border divide-y">
            {endpoints.map((endpoint) => (
              <li
                key={endpoint.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <ChannelBadge channel={endpoint.channel} />
                  <span className="text-foreground truncate text-sm">
                    {endpoint.channel === "EMAIL"
                      ? String(endpoint.config.email ?? "")
                      : String(endpoint.config.webhookUrl ?? "").slice(0, 40)}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs">
                  {endpoint.rules.length} rule
                  {endpoint.rules.length !== 1 ? "s" : ""}
                  {endpoint.rules.filter((r) => r.enabled).length > 0 &&
                    ` · ${endpoint.rules.filter((r) => r.enabled).length} enabled`}
                </span>
              </li>
            ))}
          </ul>
          {endpoints.length === 0 && (
            <p className="text-muted-foreground px-4 py-8 text-center text-sm">
              No notification endpoints configured.{" "}
              <Link href="/notifications" className="text-primary hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardClient;
