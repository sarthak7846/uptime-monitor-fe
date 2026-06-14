"use client";

import { useActionState, useEffect, useState } from "react";
import { MonitorState, Monitor, MonitorActionIntent, ModalState } from "./types";
import { monitorAction } from "./actions";
import { toast } from "sonner";
import MonitorForm from "@/components/MonitorForm";
import MonitorList from "@/components/MonitorList";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

const MonitorClient = ({ initialMonitorState }: { initialMonitorState: MonitorState }) => {
  const [actionState, action, pending] = useActionState(monitorAction, initialMonitorState);
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [liveMonitorState, setLiveMonitorState] = useState(initialMonitorState);

  useEffect(() => {
    if (actionState.success) {
      if (
        actionState.lastAction === MonitorActionIntent.CREATE ||
        actionState.lastAction === MonitorActionIntent.UPDATE
      ) {
        closeModal();
        toast.success(
          `Monitor ${actionState.lastAction === MonitorActionIntent.CREATE ? "created" : "updated"} successfully`
        );
      } else if (actionState.lastAction === MonitorActionIntent.DELETE) {
        toast.success("Monitor deleted");
      }
    }
  }, [actionState.success, actionState.lastAction]);

  useEffect(() => {
    setLiveMonitorState(actionState);
  }, [actionState]);

  useRealtimeSubscription((data) => {
    setLiveMonitorState((prev) => {
      if (data.type === "monitor.status") {
        return {
          ...prev,
          monitors: prev.monitors.map((monitor) => {
            return monitor.id === data.monitorId
              ? {
                  ...monitor,
                  lastStatus: data.status,
                }
              : monitor;
          }),
        };
      }
      return prev;
    });
  });

  const openCreate = () => setModal({ mode: "create" });
  const openEdit = (monitor: Monitor) => setModal({ mode: "edit", monitor });
  const closeModal = () => setModal({ mode: "closed" });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground text-xl font-semibold tracking-tight">Monitors</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View and manage uptime monitors for your services.
          </p>
        </div>

        <button
          type="button"
          name="intent"
          value="create"
          onClick={() => openCreate()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="text-base leading-none">+</span>
          <span>New monitor</span>
        </button>
      </div>

      <MonitorList action={action} openEdit={openEdit} state={liveMonitorState} />
      {actionState.error && <div className="text-red-500">{JSON.stringify(actionState.error)}</div>}

      {modal.mode !== "closed" && (
        <MonitorForm
          action={action}
          pending={pending}
          intent={modal.mode === "edit" ? MonitorActionIntent.UPDATE : MonitorActionIntent.CREATE}
          monitor={modal.mode === "edit" ? modal.monitor : undefined}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MonitorClient;
