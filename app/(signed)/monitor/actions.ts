'use server'

import { apiFetch } from "@/lib/api";
import { CreateMonitorState } from "./types";
import { createMonitorSchema } from "./schema";

export const createMonitorAction = async (prev: CreateMonitorState, formData: FormData) => {
    try {       
        const parsed = createMonitorSchema.safeParse(Object.fromEntries(formData));

        if(!parsed.success) {
            return {
                ...prev,
                error: parsed.error
            }
        }

        console.log('data', parsed)

        const res = await apiFetch('/monitor',{
            method: 'POST',
            body: parsed.data as any
        });

        console.log('res', res)

        return prev;
    } catch (error: any) {
        console.log('error',error)
        return {monitors: prev.monitors, error: error.response?.data?.message ?? "Something went wrong"}
    }
};