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
        className="border-border bg-card relative z-40 w-full max-w-lg rounded-2xl border p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="endpoint-form-title"
              className="text-foreground text-base font-semibold tracking-tight"
            >
              Add notification endpoint
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">Choose where alerts are delivered.</p>
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
            <label htmlFor="channel" className="text-foreground text-xs font-medium">
              Channel
            </label>
            <select
              id="channel"
              name="channel"
              value={channel}
              onChange={(e) => setChannel(e.target.value as NotificationChannel)}
              className="border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
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
              <label htmlFor="email" className="text-foreground text-xs font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="alerts@example.com"
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label htmlFor="webhookUrl" className="text-foreground text-xs font-medium">
                Webhook URL
              </label>
              <input
                id="webhookUrl"
                name="webhookUrl"
                type="url"
                required
                placeholder="https://hooks.slack.com/services/..."
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:outline-none"
              />
            </div>
          )}

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
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-xs font-medium"
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
