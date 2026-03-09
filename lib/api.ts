import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL;

export const apiFetch = async (path: string, requestInit?: RequestInit) => {
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    const res = await fetch(`${API_BASE_URL}${path}`, {
        cache: 'no-store',
        ...requestInit,
        headers: {
            ...(requestInit?.headers || {}),
            Authorization: token ? `Bearer ${token}` : ''
        }
    });

    const resJson = await res.json();

    if (!res.ok) {
        // throw new Error('Failed to load monitors');
        console.log(resJson.error, resJson.message)
    }

    return resJson;
}