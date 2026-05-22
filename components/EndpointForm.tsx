"use client";

import { useState } from "react";
import { NotificationChannel } from "@/app/(signed)/notifications/types";

export type EndpointFormValues = {
  channel: NotificationChannel;
  email?: string;
  webhookUrl?: string;
};

const EndpointForm = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: EndpointFormValues) => void;
}) => {
  const [channel, setChannel] = useState<NotificationChannel>("EMAIL");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values: EndpointFormValues = { channel };

    if (channel === "EMAIL") {
      values.email = String(form.get("email") ?? "");
    } else {
      values.webhookUrl = String(form.get("webhookUrl") ?? "");
    }

    onSave(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div className="absolute inset-0" aria-hidden onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="endpoint-form-title"
        className="relative z-40 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="endpoint-form-title"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Add notification endpoint
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose where alerts are delivered.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              htmlFor="channel"
              className="text-xs font-medium text-foreground"
            >
              Channel
            </label>
            <select
              id="channel"
              name="channel"
              value={channel}
              onChange={(e) =>
                setChannel(e.target.value as NotificationChannel)
              }
              className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="EMAIL">EMAIL — delivered today</option>
              <option value="SLACK">SLACK — saved only</option>
              <option value="WEBHOOK">WEBHOOK — saved only</option>
            </select>
            {channel !== "EMAIL" && (
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                This channel is stored but not delivered yet by the backend.
              </p>
            )}
          </div>

          {channel === "EMAIL" ? (
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-foreground"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="alerts@example.com"
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label
                htmlFor="webhookUrl"
                className="text-xs font-medium text-foreground"
              >
                Webhook URL
              </label>
              <input
                id="webhookUrl"
                name="webhookUrl"
                type="url"
                required
                placeholder="https://hooks.slack.com/services/..."
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-xs font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Add endpoint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EndpointForm;
