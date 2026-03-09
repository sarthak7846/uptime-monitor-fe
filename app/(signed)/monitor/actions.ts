'use server'

import { apiFetch } from "@/lib/api";
import { CreateMonitorForm, CreateMonitorState } from "./types";

export const createMonitorAction = async (prev: CreateMonitorState, formData: FormData) => {
    try {
        // console.log('formdata for create monitor', formData.entries().map((item) => item));
        // const data = formData.entries();
        const data:any = {};
        for (const [key, value] of formData.entries()) {
            console.log(key, value, typeof value);
            data[key] = value;
          }

          console.log('data', data)
        const res = await apiFetch('/monitor',{
            method: 'POST',
            body: data
        });

        return prev;
    } catch (error: any) {
        console.log('error',error)
        return {monitors: prev.monitors, error: error.response?.data?.message ?? "Something went wrong"}
    }
};