"use client";

import { useState } from "react";
import { MonitorOption, NotificationEventName } from "@/app/(signed)/notifications/types";

export type RuleFormValues = {
  endpointId: string;
  monitorId: string | null;
  events: NotificationEventName[];
  enabled: boolean;
};

const RuleForm = ({
  endpointId,
  monitors,
  onClose,
  onSave,
}: {
  endpointId: string;
  monitors: MonitorOption[];
  onClose: () => void;
  onSave: (values: RuleFormValues) => void;
}) => {
  const [events, setEvents] = useState<NotificationEventName[]>(["monitor.down", "monitor.up"]);

  const toggleEvent = (event: NotificationEventName) => {
    setEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (events.length === 0) return;

    const form = new FormData(e.currentTarget);
    const monitorRaw = String(form.get("monitorId") ?? "");
    onSave({
      endpointId,
      monitorId: monitorRaw === "" ? null : monitorRaw,
      events,
      enabled: form.get("enabled") === "on",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="absolute inset-0" aria-hidden onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rule-form-title"
        className="border-border bg-card relative z-40 w-full max-w-lg rounded-2xl border p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="rule-form-title"
              className="text-foreground text-base font-semibold tracking-tight"
            >
              Add notification rule
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Choose when alerts fire for this endpoint.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label htmlFor="monitorId" className="text-foreground text-xs font-medium">
              Monitor scope
            </label>
            <select
              id="monitorId"
              name="monitorId"
              defaultValue=""
              className="border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <option value="">All monitors</option>
              {monitors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name || m.url}
                </option>
              ))}
            </select>
            {monitors.length === 0 && (
              <p className="text-muted-foreground text-[11px]">
                No monitors yet. Scope will apply to all monitors when you add them.
              </p>
            )}
          </div>

          <fieldset className="space-y-2">
            <legend className="text-foreground text-xs font-medium">Events</legend>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={events.includes("monitor.down")}
                onChange={() => toggleEvent("monitor.down")}
                className="border-input h-4 w-4 rounded"
              />
              Monitor went down
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={events.includes("monitor.up")}
                onChange={() => toggleEvent("monitor.up")}
                className="border-input h-4 w-4 rounded"
              />
              Monitor recovered
            </label>
            {events.length === 0 && (
              <p className="text-destructive text-[11px]">Select at least one event.</p>
            )}
          </fieldset>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked
              className="border-input h-4 w-4 rounded"
            />
            Rule enabled
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border-input bg-background hover:bg-muted inline-flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={events.length === 0}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              Add rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RuleForm;
