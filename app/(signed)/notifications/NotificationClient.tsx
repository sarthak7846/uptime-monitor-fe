"use client";

import { useState } from "react";
import { toast } from "sonner";
import { initialNotificationUIState } from "./mock-data";
import {
  EndpointModalState,
  NotificationEndpoint,
  NotificationRule,
  NotificationUIState,
  RuleModalState,
} from "./types";
import EndpointList from "@/components/EndpointList";
import EndpointForm, { EndpointFormValues } from "@/components/EndpointForm";
import RuleForm, { RuleFormValues } from "@/components/RuleForm";

const newId = () => crypto.randomUUID();

const NotificationClient = () => {
  const [state, setState] = useState<NotificationUIState>(
    initialNotificationUIState
  );
  const [endpointModal, setEndpointModal] = useState<EndpointModalState>({
    mode: "closed",
  });
  const [ruleModal, setRuleModal] = useState<RuleModalState>({ mode: "closed" });

  const handleSaveEndpoint = (values: EndpointFormValues) => {
    const config =
      values.channel === "EMAIL"
        ? { email: values.email }
        : { webhookUrl: values.webhookUrl };

    const endpoint: NotificationEndpoint = {
      id: newId(),
      channel: values.channel,
      config: config as Record<string, unknown>,
      createdAt: new Date().toISOString(),
      rules: [],
    };

    setState((prev) => ({
      ...prev,
      endpoints: [...prev.endpoints, endpoint],
    }));
    toast.success("Endpoint added (UI preview)");
  };

  const handleSaveRule = (values: RuleFormValues) => {
    const rule: NotificationRule = {
      id: newId(),
      endpointId: values.endpointId,
      monitorId: values.monitorId,
      events: values.events,
      enabled: values.enabled,
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      endpoints: prev.endpoints.map((ep) =>
        ep.id === values.endpointId
          ? { ...ep, rules: [...ep.rules, rule] }
          : ep
      ),
    }));
    toast.success("Rule added (UI preview)");
  };

  const emailDuplicates = state.endpoints
    .filter((e) => e.channel === "EMAIL")
    .map((e) => String(e.config.email ?? "").toLowerCase())
    .filter((email, i, arr) => email && arr.indexOf(email) !== i);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure where alerts are sent and when they fire. Email delivery
            runs on the server when monitors go up or down.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEndpointModal({ mode: "create" })}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="text-base leading-none">+</span>
          <span>Add endpoint</span>
        </button>
      </div>

      <div
        role="note"
        className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
      >
        <p>
          <span className="font-medium text-foreground">EMAIL</span> alerts are
          sent when monitors change state.{" "}
          <span className="font-medium text-foreground">SLACK</span> and{" "}
          <span className="font-medium text-foreground">WEBHOOK</span> endpoints
          can be saved for future use. Settings cannot be edited in-app until
          update/delete APIs exist.
        </p>
        <p className="mt-2 text-xs">
          Incidents on the{" "}
          <a href="/incident" className="font-medium text-primary underline-offset-2 hover:underline">
            Incidents
          </a>{" "}
          page reflect downtime events that can trigger these notifications.
        </p>
      </div>

      {emailDuplicates.length > 0 && (
        <div className="rounded-lg border border-amber-200/80 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          This email is already configured on another endpoint:{" "}
          {emailDuplicates.join(", ")}
        </div>
      )}

      <EndpointList
        state={state}
        onAddRule={(endpointId) =>
          setRuleModal({ mode: "create", endpointId })
        }
      />

      {endpointModal.mode === "create" && (
        <EndpointForm
          onClose={() => setEndpointModal({ mode: "closed" })}
          onSave={handleSaveEndpoint}
        />
      )}

      {ruleModal.mode === "create" && (
        <RuleForm
          endpointId={ruleModal.endpointId}
          monitors={state.monitors}
          onClose={() => setRuleModal({ mode: "closed" })}
          onSave={handleSaveRule}
        />
      )}
    </div>
  );
};

export default NotificationClient;
