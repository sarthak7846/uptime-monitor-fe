"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AuthMode = "signin" | "signup";

export async function authAction(mode: AuthMode, _: any, formData: FormData) {
  try {
    console.log("formdata", formData);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (mode === "signup") {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      console.log("redircting", res.data);

      return {
        success: true,
        message: "Account created successfully!",
      };
    }

    console.log("some");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const token = res.data.access_token;
    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("token", token);
    }
  } catch (error: any) {
    console.log("error", error?.response?.data);
    const message = error?.response?.data?.message ?? "Something went wrong";
    return {
      message,
    };
  }

  redirect('/dashboard');
}

export async function getAccessToken() {
  return (await cookies()).get("token")?.value || null;
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/auth/signin");
}
