import { useRealtime } from "@/contexts/realtime";
import { DependencyList, useEffect } from "react";

export const useRealtimeSubscription = (
  handler: (event: any) => void,
  deps: DependencyList = []
) => {
  const { subscribe } = useRealtime();
  useEffect(() => {
    subscribe(handler);
  }, deps);
};
