import { StatusPage, StatusPageActionIntent } from "@/app/(signed)/status-page/types";
import { Monitor } from "@/app/(signed)/monitor/types";
import { useState } from "react";

const StatusPageForm = ({
  action,
  pending,
  intent,
  statusPage,
  monitors,
  onClose,
}: {
  action: (payload: FormData) => void;
  pending: boolean;
  intent: StatusPageActionIntent;
  statusPage?: StatusPage;
  monitors: Monitor[];
  onClose: () => void;
}) => {
  const [selectedMonitorIds, setSelectedMonitorIds] = useState<string[]>(
    statusPage?.monitors.map((m) => m.id) ?? []
  );

  const toggleMonitor = (id: string) => {
    setSelectedMonitorIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
      <div
        className="absolute inset-0"
        aria-hidden
        onClick={() => {
          onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-page-form-title"
        className="border-border bg-card relative z-40 w-full max-w-lg rounded-2xl border p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="status-page-form-title"
              className="text-foreground text-base font-semibold tracking-tight"
            >
              {intent === StatusPageActionIntent.CREATE ? "Create status page" : "Edit status page"}
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Configure a public status page for your monitored services.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="text-muted-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="space-y-4" action={action}>
          <input
            type="hidden"
            name="intent"
            value={intent === StatusPageActionIntent.CREATE ? "create" : "update"}
          />
          {intent === StatusPageActionIntent.UPDATE && statusPage?.id && (
            <input type="hidden" name="id" value={statusPage.id} />
          )}
          <input type="hidden" name="monitorIds" value={JSON.stringify(selectedMonitorIds)} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="sp-name" className="text-foreground text-xs leading-none font-medium">
                Name
              </label>
              <input
                id="sp-name"
                name="name"
                type="text"
                required
                defaultValue={statusPage?.name ?? ""}
                placeholder="Main Services"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="sp-slug" className="text-foreground text-xs leading-none font-medium">
                Slug
              </label>
              <input
                id="sp-slug"
                name="slug"
                type="text"
                required
                defaultValue={statusPage?.slug ?? ""}
                placeholder="main-services"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
              <p className="text-muted-foreground text-[11px]">
                URL-friendly identifier. Your page will be available at{" "}
                <span className="font-mono">/status/your-slug</span>
              </p>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label
                htmlFor="sp-description"
                className="text-foreground text-xs leading-none font-medium"
              >
                Description
              </label>
              <textarea
                id="sp-description"
                name="description"
                rows={2}
                defaultValue={statusPage?.description ?? ""}
                placeholder="Optional description for your status page"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>

            {/* Monitor multi-select */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-foreground text-xs leading-none font-medium">Monitors</label>
              {monitors.length > 0 ? (
                <div className="border-input bg-background max-h-40 space-y-1 overflow-y-auto rounded-lg border p-2">
                  {monitors.map((monitor) => (
                    <label
                      key={monitor.id}
                      className="hover:bg-muted/60 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMonitorIds.includes(monitor.id)}
                        onChange={() => toggleMonitor(monitor.id)}
                        className="accent-primary h-3.5 w-3.5 rounded"
                      />
                      <span className="text-foreground truncate">
                        {monitor.name || monitor.url}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">
                  No monitors available. Create monitors first.
                </p>
              )}
              <p className="text-muted-foreground text-[11px]">
                Select which monitors to display on this status page.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="border-input bg-background text-foreground hover:bg-muted focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-xs font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              disabled={pending}
            >
              {intent === StatusPageActionIntent.CREATE
                ? "Create status page"
                : "Update status page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusPageForm;
