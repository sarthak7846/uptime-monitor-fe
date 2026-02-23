"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(_: any, formData: FormData) {
  try {
    console.log(
      "server func invoked",
      formData,
      typeof formData,
      process.env.API_BASE_URL
    );
    const email = formData.get("email");
    const password = formData.get("password");

    const { data } = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    console.log("data", data);

    const token = data.access_token;

    const cookieStore = await cookies();

    cookieStore.set("token", token);
  } catch (error: any) {
    return {
      message: error.response?.data?.message ?? {
        message: "Something went wrong",
      },
    };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/auth/signin");
}
