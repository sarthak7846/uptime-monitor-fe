"use client";

import { useState } from "react";
import type { PublicStatusPageData, PublicMonitor, HistoryEntry } from "./types";

/* ─── Status helpers ──────────────────────────────────────────────────────── */

const statusConfig = {
  operational: {
    label: "Operational",
    dotClass: "bg-emerald-400",
    badgeClass: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    headerGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  degraded: {
    label: "Degraded Performance",
    dotClass: "bg-amber-400",
    badgeClass: "border-amber-400/30 bg-amber-400/10 text-amber-400",
    headerGradient: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
  down: {
    label: "Major Outage",
    dotClass: "bg-red-400",
    badgeClass: "border-red-400/30 bg-red-400/10 text-red-400",
    headerGradient: "from-red-500/20 via-red-500/5 to-transparent",
  },
} as const;

const monitorStatusConfig = {
  UP: {
    label: "Operational",
    dotClass: "bg-emerald-400",
    textClass: "text-emerald-400",
  },
  DOWN: {
    label: "Down",
    dotClass: "bg-red-400",
    textClass: "text-red-400",
  },
  PENDING: {
    label: "Checking…",
    dotClass: "bg-amber-400",
    textClass: "text-amber-400",
  },
} as const;

/* ─── Bar color helper ────────────────────────────────────────────────────── */

function uptimeBarColor(uptime: number): string {
  if (uptime >= 99) return "bg-emerald-400";
  if (uptime >= 95) return "bg-emerald-400/70";
  if (uptime >= 80) return "bg-amber-400";
  if (uptime >= 50) return "bg-amber-400/70";
  if (uptime > 0) return "bg-red-400";
  return "bg-red-400/40";
}

function uptimeBarHoverColor(uptime: number): string {
  if (uptime >= 99) return "bg-emerald-300";
  if (uptime >= 95) return "bg-emerald-300/70";
  if (uptime >= 80) return "bg-amber-300";
  if (uptime >= 50) return "bg-amber-300/70";
  if (uptime > 0) return "bg-red-300";
  return "bg-red-300/40";
}

/* ─── Uptime bar component ────────────────────────────────────────────────── */

function UptimeBar({ history }: { history: HistoryEntry[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Show last 90 entries (or fewer if not enough data)
  const bars = history.slice(-90);

  return (
    <div className="relative">
      <div className="flex items-end gap-[2px]">
        {bars.map((entry, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={entry.date}
              className="group relative flex-1"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className={`h-8 min-w-[3px] rounded-sm transition-all duration-150 ${
                  isHovered
                    ? `${uptimeBarHoverColor(entry.uptime)} scale-y-110`
                    : uptimeBarColor(entry.uptime)
                }`}
              />

              {/* Tooltip */}
              {isHovered && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2">
                  <div className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                    <p className="font-medium text-white">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-0.5 text-zinc-400">
                      Uptime:{" "}
                      <span
                        className={
                          entry.uptime >= 99
                            ? "text-emerald-400"
                            : entry.uptime >= 80
                              ? "text-amber-400"
                              : "text-red-400"
                        }
                      >
                        {entry.uptime.toFixed(2)}%
                      </span>
                    </p>
                  </div>
                  <div className="mx-auto h-2 w-2 -translate-y-[1px] rotate-45 border-r border-b border-white/10 bg-zinc-900" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Date labels */}
      <div className="mt-1.5 flex justify-between text-[10px] text-zinc-500">
        <span>
          {bars.length > 0
            ? new Date(bars[0].date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : ""}
        </span>
        <span>Today</span>
      </div>
    </div>
  );
}

/* ─── Monitor card ────────────────────────────────────────────────────────── */

function MonitorCard({ monitor }: { monitor: PublicMonitor }) {
  const cfg = monitorStatusConfig[monitor.status] || monitorStatusConfig.PENDING;

  return (
    <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
      {/* Top row: name + status + uptime % */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${cfg.dotClass}`}
            />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${cfg.dotClass}`} />
          </span>
          <h3 className="text-sm font-semibold text-white">{monitor.name}</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium ${cfg.textClass}`}>{cfg.label}</span>
          <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-xs font-semibold text-white">
            {monitor.uptime90Days.uptimePercentage.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Uptime history bars */}
      <div className="mt-4">
        <UptimeBar history={monitor.history} />
      </div>

      {/* Footer meta */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
        <span>
          {monitor.uptime90Days.incidentCount} incident
          {monitor.uptime90Days.incidentCount !== 1 ? "s" : ""} in 90 days
        </span>
        <span>90-day uptime</span>
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */

export default function PublicStatusPage({
  data,
  error,
}: {
  data: PublicStatusPageData | null;
  error: string | null;
}) {
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <svg
              className="h-7 w-7 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-white">Something went wrong</h1>
          <p className="mt-1 text-sm text-zinc-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const overall = statusConfig[data.overallStatus] || statusConfig.operational;

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      {/* Subtle gradient glow at top */}
      <div
        className={`absolute inset-x-0 top-0 h-72 bg-gradient-to-b ${overall.headerGradient} pointer-events-none`}
      />

      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{data.name}</h1>
          {data.description && <p className="mt-2 text-sm text-zinc-400">{data.description}</p>}

          {/* Overall status badge */}
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${overall.dotClass}`}
              />
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${overall.dotClass}`}
              />
            </span>
            <span
              className={overall.badgeClass
                .split(" ")
                .filter((c) => c.startsWith("text-"))
                .join(" ")}
            >
              {overall.label}
            </span>
          </div>
        </header>

        {/* ── Monitor list ── */}
        <div className="mt-10 space-y-3">
          {data.monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>

        {/* ── Footer ── */}
        <footer className="mt-14 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-zinc-600">
            Powered by <span className="font-medium text-zinc-400">Uptime Monitor</span>
          </p>
          <p className="mt-1 text-[10px] text-zinc-700">
            Last checked{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </footer>
      </div>
    </div>
  );
}
