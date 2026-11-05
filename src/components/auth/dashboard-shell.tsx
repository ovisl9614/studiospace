"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  User,
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-context";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/add-studio", label: "Add New Studio", icon: PlusCircle },
  { href: "/dashboard/listings", label: "My Studio Listings", icon: Building2 },
  { href: "/dashboard/bookings", label: "My Bookings", icon: CalendarDays },
];

export function DashboardShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-24 text-center text-muted-foreground">
        Checking your session…
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-border/60 bg-card p-4">
          <Logo
            markClassName="size-8"
            wordmarkClassName="text-base"
            className="mb-5 gap-2 px-2"
          />

          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => {
              const Icon = link.icon;
              const active =
                link.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/12 text-primary"
                      : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => router.push("/logout")}
              className="mt-2 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            <p className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm">
              Signed in as <span className="font-semibold">{user.name}</span>
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
