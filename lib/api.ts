import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL;

export const apiFetch = async (path: string, requestInit?: RequestInit) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const isJsonBody =
        requestInit?.body && typeof requestInit.body === "object";

    const res = await fetch(`${API_BASE_URL}${path}`, {
        cache: 'no-store',
        ...requestInit,
        headers: {
            ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
            ...(requestInit?.headers || {}),
            Authorization: token ? `Bearer ${token}` : ''
        },
        body: isJsonBody
            ? JSON.stringify(requestInit.body)
            : requestInit?.body,
    });

    const resJson = await res.json();

    if (!res.ok) {
        throw new Error(resJson)
    }

    return resJson;
};