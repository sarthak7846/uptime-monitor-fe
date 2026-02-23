"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { signOutAction } from "@/app/auth/actions";

const SignedHeader = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/80">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-90"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium">
          U
        </span>
        <span className="hidden sm:inline">Uptime Monitor</span>
      </Link>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full outline-none ring-sidebar-ring focus-visible:ring-2"
          aria-expanded={open}
          aria-haspopup="true"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium ring-1 ring-sidebar-border">
            U
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Account
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-20 mt-2 w-48 origin-top-right rounded-xl border border-sidebar-border bg-popover py-1 shadow-lg animate-in fade-in-0 zoom-in-95">
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                Sign out
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default SignedHeader;
