import { Monitor, MonitorState, MonitorStatus } from "@/app/(signed)/monitor/types"

const getStatusStyles = (status: MonitorStatus) => {
    switch (status) {
        case 'UP':
            return "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300";
        case "DOWN":
            return "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300";
        case "PENDING":
            return "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300";
        default:
            return "";
    }
};

const MonitorList = ({state, openEdit, action}: {
    state: MonitorState;
    openEdit: (monitor: Monitor) => void;
    action: (payload: FormData) => void
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
    <table className="min-w-full divide-y divide-border text-sm ">
        <thead className="bg-muted/50">
            <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Monitor
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    URL
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Method
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Interval
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Timeout
                </th>
                {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Last checked
                </th> */}
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
            {state.monitors.map((monitor) => (
                <tr key={monitor.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3 align-top">
                        <div className="flex flex-col">
                            <span className="font-medium text-foreground">{monitor.name}</span>
                            <span className="text-xs text-muted-foreground">ID: {monitor.id}</span>
                        </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                        <span className="truncate text-xs text-muted-foreground">{monitor.url}</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                        <span className="truncate text-xs text-muted-foreground">{monitor.method}</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(
                                monitor.lastStatus
                            )}`}
                        >
                            {monitor.lastStatus === "UP" && (
                                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                            )}
                            {monitor.lastStatus === "DOWN" && (
                                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
                            )}
                            {monitor.lastStatus === "PENDING" && (
                                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                            )}
                            <span className="capitalize">{monitor.lastStatus}</span>
                        </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                        <span className="text-xs text-muted-foreground">{monitor.interval} ms</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                        <span className="text-xs text-muted-foreground">{monitor.timeout} ms</span>
                    </td>
                    {/* <td className="px-4 py-3 align-top">
                        <span className="text-xs text-muted-foreground">{monitor.lastChecked}</span>
                    </td> */}
                    <td className="px-4 py-3 align-top">
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => openEdit(monitor)}
                                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                Update
                            </button>
                            <form action={action}>
                                <input type="hidden" name="intent" value="delete" />
                                <input type="hidden" name="id" value={monitor.id} />
                                <button
                                    type="submit"
                                    name="intent"
                                    value="delete"
                                    className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                                >
                                    Delete
                                </button>
                            </form>

                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

    {state.monitors.length === 0 && (
        <div className="px-6 py-10 text-center text-sm text-muted-foreground">
            No monitors yet. Click{" "}
            <span className="font-medium text-foreground">New monitor</span> to create your first one.
        </div>
    )}
</div>
  )
}

export default MonitorList