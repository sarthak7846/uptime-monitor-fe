import { Monitor, MonitorActionIntent } from "@/app/(signed)/monitor/types";

const MonitorForm = ({
  action,
  pending,
  intent,
  monitor,
  onClose,
}: {
  action: (payload: FormData) => void;
  pending: boolean;
  intent: MonitorActionIntent;
  monitor?: Monitor;
  onClose: () => void;
}) => {
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
        aria-labelledby="create-monitor-title"
        className="border-border bg-card relative z-40 w-full max-w-lg rounded-2xl border p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2
              id="create-monitor-title"
              className="text-foreground text-base font-semibold tracking-tight"
            >
              {intent === MonitorActionIntent.CREATE ? "Create monitor" : "Edit monitor"}
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Configure a new uptime monitor for your service.
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
            value={intent === MonitorActionIntent.CREATE ? "create" : "update"}
          />
          {intent === MonitorActionIntent.UPDATE && monitor?.id && (
            <input type="hidden" name="id" value={monitor.id} />
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="name" className="text-foreground text-xs leading-none font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={monitor?.name ?? ""}
                placeholder="Marketing site"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
              <p className="text-muted-foreground text-[11px]">
                Optional. Helps you identify this monitor.
              </p>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="url" className="text-foreground text-xs leading-none font-medium">
                URL
              </label>
              <input
                id="url"
                name="url"
                type="url"
                defaultValue={monitor?.url ?? ""}
                required
                placeholder="https://example.com/health"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="method" className="text-foreground text-xs leading-none font-medium">
                Method
              </label>
              <select
                id="method"
                name="method"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                defaultValue={monitor?.method ?? ""}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="HEAD">HEAD</option>
              </select>
            </div>

            {/* <div className="space-y-1.5">
                            <label
                                htmlFor="lastStatus"
                                className="text-xs font-medium leading-none text-foreground"
                            >
                                Last status
                            </label>
                            <select
                                id="lastStatus"
                                name="lastStatus"
                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                defaultValue={monitor?.lastStatus ?? ''}
                            >
                                <option value="">Not set</option>
                                <option value="PENDING">PENDING</option>
                                <option value="UP">UP</option>
                                <option value="DOWN">DOWN</option>
                            </select>
                            <p className="text-[11px] text-muted-foreground">
                                Optional. Reflects the last known state.
                            </p>
                        </div> */}

            <div className="space-y-1.5">
              <label
                htmlFor="interval"
                className="text-foreground text-xs leading-none font-medium"
              >
                Interval (milliseconds)
              </label>
              <input
                id="interval"
                name="interval"
                type="number"
                min={1000}
                defaultValue={monitor?.interval ?? ""}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="timeout" className="text-foreground text-xs leading-none font-medium">
                Timeout (milliseconds)
              </label>
              <input
                id="timeout"
                name="timeout"
                type="number"
                min={1}
                defaultValue={monitor?.timeout ?? ""}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-lg border px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
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
              {intent === MonitorActionIntent.CREATE ? "Create monitor" : "Update monitor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonitorForm;
