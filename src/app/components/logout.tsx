"use client";

import * as React from "react";

import { useAuth } from "@/components/auth/auth-context";
import { LogoMark } from "@/components/layout/logo";

/**
 * `/logout` page body: clears the local session as soon as it mounts, then
 * hands the visitor back to the homepage via the auth context's `logout`.
 */
export function LogoutPage() {
  const { logout } = useAuth();

  React.useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center">
      <LogoMark className="size-12 rounded-2xl" />
      <p className="mt-5 font-semibold">Signing you out…</p>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Clearing your session and taking you home.
      </p>
    </div>
  );
}
