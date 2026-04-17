'use client'

import { FormEvent, useActionState, useState } from "react";
import { CreateMonitorState, HttpMethod, Monitor, MonitorState } from "./types";
import { createMonitorAction } from "./actions";

const MonitorClient = ({ initialMonitorState }: {
    initialMonitorState: CreateMonitorState
}) => {
    const [state, action, pending] = useActionState(createMonitorAction, initialMonitorState);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // const [createForm, setCreateForm] = useState<CreateMonitorForm>({
    //     name: "",
    //     url: "",
    //     method: "GET",
    //     interval: 60,
    //     timeout: 5,
    // });

    const handleUpdate = (monitor: Monitor) => {
        // TODO: Wire this up to your update flow (drawer / modal / separate page)
        console.log("Update monitor", monitor);
    };

    const handleDelete = (id: number) => {
        // TODO: Replace with real delete action + confirmation
        // setMonitors((current) => current.filter((m) => m.id !== id));
    };

    const getStatusStyles = (status: MonitorState) => {
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

    const resetCreateForm = () => {
        // setCreateForm({
        //     name: "",
        //     url: "",
        //     method: "GET",
        //     interval: 60,
        //     timeout: 5,
        // });
    };

    const handleCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
        // event.preventDefault();

        // if (!createForm.url) {
        //     return;
        // }

        // const nextId = monitors.length ? Math.max(...monitors.map((m) => m.id)) + 1 : 1;

        // const status: Monitor["status"] =
        //     createForm.lastStatus === "UP"
        //         ? "up"
        //         : createForm.lastStatus === "DOWN"
        //             ? "down"
        //             : "paused";

        // const newMonitor: Monitor = {
        //     id: nextId,
        //     name: createForm.name || createForm.url,
        //     url: createForm.url,
        //     status,
        //     interval: `${createForm.interval}s`,
        //     lastChecked: "Just now",
        // };

        // setMonitors((current) => [newMonitor, ...current]);
        // setIsCreateOpen(false);
        // resetCreateForm();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">Monitors</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        View and manage uptime monitors for your services.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <span className="text-base leading-none">+</span>
                    <span>New monitor</span>
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="min-w-full divide-y divide-border text-sm">
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
                                            onClick={() => handleUpdate(monitor)}
                                            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(monitor.id)}
                                            className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                                        >
                                            Delete
                                        </button>
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

            {isCreateOpen && (
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
                                        Interval (seconds)
                                    </label>
                                    <input
                                        id="interval"
                                        name="interval"
                                        type="number"
                                        min={5}
                                        step={5}
                                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="timeout"
                                        className="text-xs font-medium leading-none text-foreground"
                                    >
                                        Timeout (seconds)
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
            )}
        </div>
    );
};

export default MonitorClient