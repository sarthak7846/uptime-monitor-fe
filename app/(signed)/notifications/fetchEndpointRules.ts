import { NotificationRule } from "./types";
import { mockRulesByEndpointId } from "./mock-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const MOCK_FETCH_DELAY_MS = 600;

let rulesCache: NotificationRule[] | null = null;
let rulesCachePromise: Promise<NotificationRule[]> | null = null;

const fetchAllRules = async (): Promise<NotificationRule[]> => {
  if (rulesCache) {
    return rulesCache;
  }

  if (!rulesCachePromise) {
    rulesCachePromise = fetch(`${API_BASE_URL}/notification/rules`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: NotificationRule[]) => {
        rulesCache = Array.isArray(data) ? data : [];
        return rulesCache;
      })
      .catch(() => {
        rulesCache = [];
        return rulesCache;
      });
  }

  return rulesCachePromise;
};

/**
 * Loads rules for a single endpoint. Uses mock data when available; otherwise
 * fetches all rules once and filters (until GET /notification/endpoints/:id/rules exists).
 */
export const fetchEndpointRules = async (endpointId: string): Promise<NotificationRule[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_FETCH_DELAY_MS));

  if (mockRulesByEndpointId[endpointId]) {
    return mockRulesByEndpointId[endpointId];
  }

  const allRules = await fetchAllRules();
  return allRules.filter((rule) => rule.endpointId === endpointId);
};
