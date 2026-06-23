"use client";
import { getAccessToken } from "@/app/auth/actions";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type RealtimeContextValue = {
  subscribe: (listener: (event: any) => void) => () => void;
  status: "connecting" | "open" | "closed";
};

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export const useRealtime = () => {
  const ctx = useContext(RealtimeContext);
  if (!ctx) {
    throw new Error("useRealtime must be used within RealtimeProvider");
  }
  return ctx;
};

export const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
  const listenersRef = useRef(new Set<(event: unknown) => void>());
  const [status, setStatus] = useState<RealtimeContextValue["status"]>("connecting");

  const subscribe = useCallback((listener: (event: any) => void) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getAccessToken().then((res) => {
      setToken(res);
    });
  }, []);

  // useEffect(() => {
  //   const sse = new EventSource(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtime/sse/events`, {
  //     withCredentials: true,
  //   });

  //   sse.onopen = () => setStatus("open");

  //   sse.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("data", data);
  //     listenersRef.current.forEach((listener) => listener(data));
  //   };

  //   sse.onerror = (err) => {
  //     console.error("SSE error", err);
  //     setStatus("closed");
  //   };

  //   return () => {
  //     console.log("disconnecting");
  //     sse.close();
  //     setStatus("closed");
  //   };
  // }, []);

  useEffect(() => {
    const controller = new AbortController();
    console.log("token", token);

    if (token)
      fetchEventSource(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtime/sse/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        signal: controller.signal,

        onopen: async () => {
          setStatus("open");
        },

        onmessage(event) {
          if (!event.data) return;

          let data;
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            console.warn("Skipping non-JSON SSE event:", event.data);
            return;
          }

          listenersRef.current.forEach((listener) => listener(data));
        },

        onerror(err) {
          console.error("SSE error", err);
          setStatus("closed");

          // optional retry control
          throw err;
        },
      });

    return () => {
      controller.abort();
      setStatus("closed");
    };
  }, [token]);

  const value = useMemo(() => {
    return {
      subscribe,
      status,
    };
  }, [subscribe, status]);

  return <RealtimeContext value={value}>{children}</RealtimeContext>;
};
