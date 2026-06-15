"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  EndpointModalState,
  NotificationEndpoint,
  NotificationRule,
  NotificationUIState,
  RuleModalState,
  RulesLoadState,
} from "./types";
import EndpointList from "@/components/EndpointList";
import EndpointForm, { EndpointFormValues } from "@/components/EndpointForm";
import RuleForm, { RuleFormValues } from "@/components/RuleForm";
import axios from "axios";

const newId = () => crypto.randomUUID();

const NotificationClient = ({
  initialNotificationUIState,
}: {
  initialNotificationUIState: NotificationUIState;
}) => {
  const [state, setState] = useState<NotificationUIState>(initialNotificationUIState);
  const [expandedEndpointIds, setExpandedEndpointIds] = useState<string[]>([]);
  const [rulesLoadState, setRulesLoadState] = useState<Record<string, RulesLoadState>>({});
  const [endpointModal, setEndpointModal] = useState<EndpointModalState>({
    mode: "closed",
  });
  const [ruleModal, setRuleModal] = useState<RuleModalState>({ mode: "closed" });

  const loadRules = useCallback(async (endpointId: string) => {
    let skip = false;
    setRulesLoadState((prev) => {
      const current = prev[endpointId];
      if (current?.status === "loading" || current?.status === "loaded") {
        skip = true;
        return prev;
      }
      return { ...prev, [endpointId]: { status: "loading" } };
    });

    if (skip) {
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/rules/${endpointId}`,
        {
          withCredentials: true,
        }
      );

      setRulesLoadState((prev) => ({
        ...prev,
        [endpointId]: { status: "loaded", rules: res.data },
      }));
    } catch {
      setRulesLoadState((prev) => ({
        ...prev,
        [endpointId]: { status: "error", message: "Could not load rules. Try again." },
      }));
    }
  }, []);

  const handleToggleEndpoint = useCallback(
    (endpointId: string) => {
      setExpandedEndpointIds((prev) => {
        if (expandedEndpointIds?.includes(endpointId)) {
          return prev.filter((id) => id !== endpointId);
        }
        void loadRules(endpointId);
        return [...prev, endpointId];
      });
    },
    [expandedEndpointIds, loadRules]
  );

  const handleRetryLoadRules = useCallback(
    (endpointId: string) => {
      setRulesLoadState((prev) => ({ ...prev, [endpointId]: { status: "idle" } }));
      void loadRules(endpointId);
    },
    [loadRules]
  );

  const handleSaveEndpoint = (values: EndpointFormValues) => {
    const config =
      values.channel === "EMAIL" ? { email: values.email } : { webhookUrl: values.webhookUrl };

    const endpoint: NotificationEndpoint = {
      id: newId(),
      channel: values.channel,
      config: config as Record<string, unknown>,
      createdAt: new Date().toISOString(),
      ruleCount: 0,
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
        ep.id === values.endpointId ? { ...ep, ruleCount: ep.ruleCount + 1 } : ep
      ),
    }));

    setRulesLoadState((prev) => {
      const current = prev[values.endpointId];
      if (current?.status !== "loaded") {
        return prev;
      }
      return {
        ...prev,
        [values.endpointId]: {
          status: "loaded",
          rules: [...current.rules, rule],
        },
      };
    });

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
          <h1 className="text-foreground text-xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Configure where alerts are sent and when they fire. Email delivery runs on the server
            when monitors go up or down.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEndpointModal({ mode: "create" })}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="text-base leading-none">+</span>
          <span>Add endpoint</span>
        </button>
      </div>

      <div
        role="note"
        className="border-border bg-muted/40 text-muted-foreground rounded-xl border px-4 py-3 text-sm"
      >
        {/* <p>
          <span className="text-foreground font-medium">EMAIL</span> alerts are sent when monitors
          change state. <span className="text-foreground font-medium">SLACK</span> and{" "}
          <span className="text-foreground font-medium">WEBHOOK</span> endpoints can be saved for
          future use. Settings cannot be edited in-app until update/delete APIs exist.
        </p> */}
        <p className="text-xs">
          Click an endpoint to load its rules. Rules are fetched on demand to keep the initial page
          load light.
        </p>
        <p className="mt-2 text-xs">
          Incidents on the{" "}
          <a
            href="/incident"
            className="text-primary font-medium underline-offset-2 hover:underline"
          >
            Incidents
          </a>{" "}
          page reflect downtime events that can trigger these notifications.
        </p>
      </div>

      {emailDuplicates.length > 0 && (
        <div className="rounded-lg border border-amber-200/80 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          This email is already configured on another endpoint: {emailDuplicates.join(", ")}
        </div>
      )}

      <EndpointList
        state={state}
        expandedEndpointIds={expandedEndpointIds}
        rulesLoadState={rulesLoadState}
        onToggleEndpoint={handleToggleEndpoint}
        onRetryLoadRules={handleRetryLoadRules}
        onAddRule={(endpointId) => {
          setExpandedEndpointIds((prev) =>
            prev.includes(endpointId) ? prev : [...prev, endpointId]
          );
          void loadRules(endpointId);
          setRuleModal({ mode: "create", endpointId });
        }}
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
