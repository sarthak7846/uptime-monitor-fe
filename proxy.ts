import { NextRequest } from "next/server";

export function proxy(request: NextRequest)  {
    console.log('cookies got', request.cookies)
}