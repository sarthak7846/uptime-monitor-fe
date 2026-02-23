"use client";

import Link from "next/link";
import { signInAction } from "../actions";
import { useActionState } from "react";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";

  const [state, action, pending] = useActionState(signInAction, null);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp
                ? "Enter your details to get started."
                : "Sign in to your uptime monitor."}
            </p>
          </div>

          <form className="space-y-4" action={action}>
            {isSignUp && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none text-foreground"
                >
                  Password
                </label>
                {!isSignUp && (
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <button
              type="submit"
              className="flex h-10 w-full disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={pending}
            >
              {isSignUp ? "Create account" : "Sign in"}
            </button>
            <p className="text-red-500">{state?.message}</p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
                >
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Uptime Monitor — monitor your services in one place
        </p>
      </div>
    </div>
  );
}
