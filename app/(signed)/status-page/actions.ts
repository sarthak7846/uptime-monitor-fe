"use server";

import { apiFetch } from "@/lib/api";
import { StatusPageActionIntent, StatusPageState } from "./types";
import { createStatusPageSchema } from "./schema";

export const statusPageAction = async (prev: StatusPageState, formData: FormData) => {
  const intent = formData.get("intent") as StatusPageActionIntent;

  try {
    if (intent === StatusPageActionIntent.CREATE) {
      const parsed = createStatusPageSchema.safeParse(Object.fromEntries(formData));

      if (!parsed.success) {
        return {
          ...prev,
          error: parsed.error.message,
          success: false,
          lastAction: intent,
        };
      }

      const res = await apiFetch("/status-page", {
        method: "POST",
        body: parsed.data as any,
      });

      return {
        ...prev,
        statusPages: [...prev.statusPages, res],
        success: true,
        lastAction: intent,
      };
    } else if (intent === StatusPageActionIntent.DELETE) {
      const statusPageId = formData.get("id") as string;

      await apiFetch(`/status-page/${statusPageId}`, {
        method: "DELETE",
      });

      return {
        ...prev,
        statusPages: prev.statusPages.filter((page) => page.id !== statusPageId),
        success: true,
        lastAction: intent,
      };
    } else if (intent === StatusPageActionIntent.UPDATE) {
      const statusPageId = formData.get("id") as string;
      const parsed = createStatusPageSchema.safeParse(Object.fromEntries(formData));

      if (!parsed.success) {
        return {
          ...prev,
          error: parsed.error.message,
          success: false,
          lastAction: intent,
        };
      }

      const updatedPage = await apiFetch(`/status-page/${statusPageId}`, {
        method: "PATCH",
        body: parsed.data as any,
      });

      return {
        ...prev,
        statusPages: prev.statusPages.map((p) => (p.id === statusPageId ? updatedPage : p)),
        success: true,
        lastAction: intent,
      };
    }

    return prev;
  } catch (error: any) {
    console.log("error", error);
    return {
      ...prev,
      statusPages: prev.statusPages,
      error: error.response?.data?.message ?? error,
      success: false,
    };
  }
};
