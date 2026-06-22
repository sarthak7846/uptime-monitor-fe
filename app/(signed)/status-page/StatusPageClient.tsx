"use client";

import { useState } from "react";
import { StatusPageState, StatusPageMonitor } from "./types";
import { MonitorStatus } from "../monitor/types";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

const getStatusStyles = (status: MonitorStatus) => {
  switch (status) {
    case "UP":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300";
    case "DOWN":
      return "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300";
    case "PENDING":
      return "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300";
    default:
      return "";
  }
};

const getStatusDot = (status: MonitorStatus) => {
  switch (status) {
    case "UP":
      return "bg-emerald-500";
    case "DOWN":
      return "bg-red-500";
    case "PENDING":
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
};

const getOverallStatus = (monitors: StatusPageMonitor[]): MonitorStatus => {
  if (monitors.length === 0) return "PENDING";
  if (monitors.some((m) => m.lastStatus === "DOWN")) return "DOWN";
  if (monitors.some((m) => m.lastStatus === "PENDING")) return "PENDING";
  return "UP";
};

const getOverallLabel = (status: MonitorStatus) => {
  switch (status) {
    case "UP":
      return "All Systems Operational";
    case "DOWN":
      return "Degraded Performance";
    case "PENDING":
      return "Checking...";
  }
};

const getOverallBadgeStyles = (status: MonitorStatus) => {
  switch (status) {
    case "UP":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "DOWN":
      return "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400";
    case "PENDING":
      return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    default:
      return "";
  }
};

const StatusPageClient = ({ initialState }: { initialState: StatusPageState }) => {
  const [state, setState] = useState(initialState);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useRealtimeSubscription((data) => {
    setState((prev) => {
      if (data.type === "monitor.status") {
        return {
          ...prev,
          statusPages: prev.statusPages.map((statusPage) => ({
            ...statusPage,
            monitors: statusPage.monitors.map((monitor) =>
              monitor.id === data.monitorId
                ? {
                    ...monitor,
                    lastStatus: data.status,
                  }
                : monitor
            ),
          })),
        };
      }

      return prev;
    });
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground text-xl font-semibold tracking-tight">Status Pages</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage public status pages for your monitored services.
          </p>
        </div>

        <button
          type="button"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="text-base leading-none">+</span>
          <span>New status page</span>
        </button>
      </div>

      {/* Status page cards */}
      <div className="space-y-3">
        {state.statusPages.map((page) => {
          const isExpanded = expandedId === page.id;
          const overall = getOverallStatus(page.monitors);

          return (
            <div
              key={page.id}
              className="border-border bg-card overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
            >
              {/* Card header — always visible */}
              <button
                type="button"
                onClick={() => toggle(page.id)}
                className="group hover:bg-muted/40 flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors"
              >
                {/* Overall status indicator */}
                <span className="relative flex h-3 w-3 shrink-0">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${getStatusDot(overall)}`}
                  />
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full ${getStatusDot(overall)}`}
                  />
                </span>

                {/* Name + meta */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground truncate font-medium">{page.name}</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getOverallBadgeStyles(overall)}`}
                    >
                      {getOverallLabel(overall)}
                    </span>
                  </div>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-3 text-xs">
                    <span className="font-mono">/{page.slug}</span>
                    <span className="text-border">•</span>
                    <span>
                      {page.monitors.length} monitor{page.monitors.length !== 1 && "s"}
                    </span>
                    {page.description && (
                      <>
                        <span className="text-border">•</span>
                        <span className="truncate">{page.description}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <svg
                  className={`text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expanded — monitor table */}
              {isExpanded && (
                <div className="border-border border-t">
                  {page.monitors.length > 0 ? (
                    <table className="divide-border min-w-full divide-y text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th
                            scope="col"
                            className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                          >
                            Monitor
                          </th>
                          <th
                            scope="col"
                            className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                          >
                            URL
                          </th>
                          <th
                            scope="col"
                            className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                          >
                            Method
                          </th>
                          <th
                            scope="col"
                            className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium tracking-wide uppercase"
                          >
                            Interval
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-border bg-card divide-y">
                        {page.monitors.map((monitor) => (
                          <tr key={monitor.id} className="hover:bg-muted/40 transition-colors">
                            <td className="px-5 py-3 align-top">
                              <span className="text-foreground font-medium">{monitor.name}</span>
                            </td>
                            <td className="px-5 py-3 align-top">
                              <span className="text-muted-foreground max-w-[14rem] truncate font-mono text-xs">
                                {monitor.url}
                              </span>
                            </td>
                            <td className="px-5 py-3 align-top">
                              <span className="border-border bg-muted/60 text-muted-foreground inline-flex rounded border px-1.5 py-0.5 text-xs font-medium">
                                {monitor.method}
                              </span>
                            </td>
                            <td className="px-5 py-3 align-top">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(monitor.lastStatus)}`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${getStatusDot(monitor.lastStatus)}`}
                                  aria-hidden
                                />
                                <span className="capitalize">{monitor.lastStatus}</span>
                              </span>
                            </td>
                            <td className="px-5 py-3 align-top">
                              <span className="text-muted-foreground text-xs">
                                {monitor.interval / 1000}s
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-muted-foreground px-5 py-8 text-center text-sm">
                      No monitors attached to this status page yet.
                    </div>
                  )}

                  {/* Card footer actions */}
                  <div className="border-border flex items-center justify-end gap-2 border-t px-5 py-3">
                    <a
                      href={`/status/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border bg-background text-foreground hover:bg-muted focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5"
                        />
                      </svg>
                      View
                    </a>
                    <button
                      type="button"
                      className="border-border bg-background text-foreground hover:bg-muted focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {state.statusPages.length === 0 && (
        <div className="border-border bg-card rounded-xl border">
          <div className="text-muted-foreground px-6 py-14 text-center text-sm">
            <svg
              className="text-muted-foreground/50 mx-auto mb-3 h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            No status pages yet. Click{" "}
            <span className="text-foreground font-medium">New status page</span> to create your
            first one.
          </div>
        </div>
      )}

      {state.error && <div className="text-sm text-red-500">{JSON.stringify(state.error)}</div>}
    </div>
  );
};

export default StatusPageClient;
