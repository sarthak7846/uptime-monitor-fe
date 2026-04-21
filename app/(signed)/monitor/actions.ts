'use server'

import { apiFetch } from "@/lib/api";
import { MonitorActionIntent, MonitorState } from "./types";
import { createMonitorSchema } from "./schema";

export const monitorAction = async (prev: MonitorState, formData: FormData) => {
    const intent = formData.get('intent') as MonitorActionIntent;
    console.log('monitor action', prev, formData, intent)
    try {
        if (intent === 'create') {
            const parsed = createMonitorSchema.safeParse(Object.fromEntries(formData));

            console.log('parsed', parsed);

            if (!parsed.success) {
                return {
                    ...prev,
                    error: parsed.error.message,
                    success: false, 
                    lastAction: intent
                }
            }

            console.log('data', parsed)

            const res = await apiFetch('/monitor', {
                method: 'POST',
                body: parsed.data as any
            });

            console.log('res', res)

            return {
                ...prev,
                monitors: [
                    ...prev.monitors,
                    res
                ],
                success: true,
                lastAction: intent
            };
        } else if (intent === 'delete') {
            console.log('formdata for deletion', formData)
            const monitorId = formData.get('id') as string;

            console.log('monitorid', monitorId, typeof monitorId, typeof prev.monitors[0].id)

            await apiFetch(`/monitor/${monitorId}`, {
                method: 'DELETE'
            });

            return {
                ...prev,
                monitors: prev.monitors.filter((monitor) => monitor.id !== monitorId),
                success: true,
                lastAction: intent
            };
        }

        return prev;

    } catch (error: any) {
        console.log('error', error)
        return { ...prev, monitors: prev.monitors, error: error.response?.data?.message ?? error, success: false }
    }
};