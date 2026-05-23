'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type RealtimeContextValue = {
    subscribe: (listener: (event: any) => void) => () => void;
    status: "connecting" | "open" | "closed";
};

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export const useRealtime = () => {
    const ctx = useContext(RealtimeContext);
    if (!ctx) {
        throw new Error('useRealtime must be used within RealtimeProvider')
    }
    return ctx;
}

export const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
    const listenersRef = useRef(new Set<(event: unknown) => void>());
    const [status, setStatus] = useState<RealtimeContextValue['status']>('connecting');

    const subscribe = useCallback((listener: (event: any) => void) => {
        listenersRef.current.add(listener);
        return () => {
            listenersRef.current.delete(listener);
        }
    }, []);

    useEffect(() => {
        const sse = new EventSource(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtime/sse/events`, {
            withCredentials: true
        });

        sse.onopen = () => setStatus("open");

        sse.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('data', data)
            listenersRef.current.forEach((listener) => listener(data));
        };

        sse.onerror = (err) => {
            console.error('SSE error', err);
            setStatus('closed');
        }

        return () => {
            console.log('disconnecting');
            sse.close();
            setStatus('closed');
        }
    }, []);

    const value = useMemo(() => {
        return {
            subscribe, status
        }
    }, [subscribe, status]);

    return <RealtimeContext value={value}>
        {children}
    </RealtimeContext>
}