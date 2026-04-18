'use server'

import { apiFetch } from "@/lib/api";
import { MonitorState } from "./types";
import { createMonitorSchema } from "./schema";

export const createMonitorAction = async (prev: MonitorState, formData: FormData) => {
    console.log('create monitor action', prev, formData)
    try {

        const parsed = createMonitorSchema.safeParse(Object.fromEntries(formData));

        console.log('parsed', parsed);

        if (!parsed.success) {
            return {
                ...prev,
                error: parsed.error
            }
        }

        console.log('data', parsed)

        const res = await apiFetch('/monitor', {
            method: 'POST',
            body: parsed.data as any
        });

        console.log('res', res)

        return {
            monitors: [
                ...prev.monitors,
                res
            ]
        };
    } catch (error: any) {
        console.log('error', error)
        return { monitors: prev.monitors, error: error.response?.data?.message ?? error }
    }
};

export const deleteMonitorAction = async (prev: MonitorState, formData: FormData) => {
    try {
        console.log('formdata for deletion', formData)
        const monitorId = formData.get('id') as string;

        console.log('monitorid', monitorId, typeof monitorId, typeof prev.monitors[0].id)

        await apiFetch(`/monitor/${monitorId}`, {
            method: 'DELETE'
        });

        return {
            ...prev,
            monitors: prev.monitors.filter((monitor) => monitor.id !== monitorId)
        };
    } catch (error: any) {
        console.log('error', error)
        return {
            ...prev,
            error: error?.response?.data?.message ?? error
        }
    }
};