import { MonitorActionIntent } from "@/app/(signed)/monitor/types";

const MonitorForm = ({
    setIsCreateOpen,
    action,
    pending,
    intent
}: {
    setIsCreateOpen: (data: boolean) => void;
    action: (payload: FormData) => void;
    pending: boolean;
    intent: MonitorActionIntent
}) => {
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-4">
            <div
                className="absolute inset-0"
                aria-hidden
                onClick={() => {
                    setIsCreateOpen(false);
                    // resetCreateForm();
                }}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-monitor-title"
                className="relative z-40 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lg"
            >
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2
                            id="create-monitor-title"
                            className="text-base font-semibold tracking-tight text-foreground"
                        >
                            Create monitor
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Configure a new uptime monitor for your service.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setIsCreateOpen(false);
                            // resetCreateForm();
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <form className="space-y-4" action={action}>
                    <input type="hidden" name="intent" value="create" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5 sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="text-xs font-medium leading-none text-foreground"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Marketing site"
                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            <p className="text-[11px] text-muted-foreground">
                                Optional. Helps you identify this monitor.
                            </p>
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                            <label
                                htmlFor="url"
                                className="text-xs font-medium leading-none text-foreground"
                            >
                                URL
                            </label>
                            <input
                                id="url"
                                name="url"
                                type="url"
                                required
                                placeholder="https://example.com/health"
                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="method"
                                className="text-xs font-medium leading-none text-foreground"
                            >
                                Method
                            </label>
                            <select
                                id="method"
                                name="method"
                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="HEAD">HEAD</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
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
                            >
                                <option value="">Not set</option>
                                <option value="PENDING">PENDING</option>
                                <option value="UP">UP</option>
                                <option value="DOWN">DOWN</option>
                            </select>
                            <p className="text-[11px] text-muted-foreground">
                                Optional. Reflects the last known state.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="interval"
                                className="text-xs font-medium leading-none text-foreground"
                            >
                                Interval (milliseconds)
                            </label>
                            <input
                                id="interval"
                                name="interval"
                                type="number"
                                min={1000}
                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="timeout"
                                className="text-xs font-medium leading-none text-foreground"
                            >
                                Timeout (milliseconds)
                            </label>
                            <input
                                id="timeout"
                                name="timeout"
                                type="number"
                                min={1}
                                step={1}
                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsCreateOpen(false);
                                // resetCreateForm();
                            }}
                            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            disabled={pending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center cursor-pointer justify-center rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={pending}
                        >
                            Create monitor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MonitorForm