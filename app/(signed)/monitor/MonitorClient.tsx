'use client'

import { useActionState, useEffect, useState } from "react";
import { MonitorState, Monitor, MonitorActionIntent, ModalState } from "./types";
import { monitorAction } from "./actions";
import { toast } from "sonner";
import MonitorForm from "@/components/MonitorForm";
import MonitorList from "@/components/MonitorList";

const MonitorClient = ({ initialMonitorState }: {
    initialMonitorState: MonitorState
}) => {
    const [actionState, action, pending] = useActionState(monitorAction, initialMonitorState);
    const [modal, setModal] = useState<ModalState>({ mode: 'closed' })
    const [liveMonitorState, setLiveMonitorState] = useState(initialMonitorState);

    useEffect(() => {
        if (actionState.success) {
            if (actionState.lastAction === MonitorActionIntent.CREATE || actionState.lastAction === MonitorActionIntent.UPDATE) {
                closeModal();
                toast.success(`Monitor ${actionState.lastAction === MonitorActionIntent.CREATE ? 'created' : 'updated'} successfully`)
            } else if (actionState.lastAction === MonitorActionIntent.DELETE) {
                toast.success('Monitor deleted')
            }
        }
    }, [actionState.success, actionState.lastAction]);

    useEffect(() => {
        setLiveMonitorState(actionState);
    }, [actionState])

    useEffect(() => {
        const sse = new EventSource(`${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor/sse/events`, {
            withCredentials: true
        });

        sse.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLiveMonitorState((prev) => {
                return {
                    ...prev,
                    monitors: prev.monitors.map((monitor) => {
                        return monitor.id === data.monitorId ? {
                            ...monitor,
                            lastStatus: data.status
                        } : monitor
                    })
                }
            })
        };

        sse.onerror = (err) => {
            console.error('SSE error', err);
        }

        return () => {
            console.log('disconnecting');
            sse.close();
        }
    }, []);

    const openCreate = () => setModal({ mode: 'create' });
    const openEdit = (monitor: Monitor) => setModal({ mode: 'edit', monitor });
    const closeModal = () => setModal({ mode: 'closed' });

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
                    name="intent"
                    value="create"
                    onClick={() => openCreate()}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <span className="text-base leading-none">+</span>
                    <span>New monitor</span>
                </button>
            </div>

            <MonitorList action={action} openEdit={openEdit} state={liveMonitorState} />
            {actionState.error && <div className="text-red-500">{JSON.stringify(actionState.error)}</div>}

            {modal.mode !== 'closed' && (
                <MonitorForm action={action} pending={pending} intent={modal.mode === 'edit' ? MonitorActionIntent.UPDATE : MonitorActionIntent.CREATE} monitor={modal.mode === 'edit' ? modal.monitor : undefined} onClose={closeModal} />
            )}
        </div>
    );
};

export default MonitorClient