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
    const [state, action, pending] = useActionState(monitorAction, initialMonitorState);
    const [modal, setModal] = useState<ModalState>({ mode: 'closed' })

    useEffect(() => {
        if (state.success) {
            if (state.lastAction === MonitorActionIntent.CREATE || state.lastAction === MonitorActionIntent.UPDATE) {
                closeModal();
                toast.success(`Monitor ${state.lastAction === MonitorActionIntent.CREATE ? 'created' : 'updated'} successfully`)
            } else if (state.lastAction === MonitorActionIntent.DELETE) {
                toast.success('Monitor deleted')
            }
        }
    }, [state.success, state.lastAction]);

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

            <MonitorList action={action} openEdit={openEdit} state={state} />
            {state.error && <div className="text-red-500">{JSON.stringify(state.error)}</div>}

            {modal.mode !== 'closed' && (
                <MonitorForm action={action} pending={pending} intent={modal.mode === 'edit' ? MonitorActionIntent.UPDATE : MonitorActionIntent.CREATE} monitor={modal.mode === 'edit' ? modal.monitor : undefined} onClose={closeModal} />
            )}
        </div>
    );
};

export default MonitorClient