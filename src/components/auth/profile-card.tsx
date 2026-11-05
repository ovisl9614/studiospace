"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react";

import { useAuth } from "@/components/auth/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfileCard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const details = [
    { label: "Display name", value: user.name, icon: UserRound },
    { label: "Email address", value: user.email, icon: Mail },
    { label: "Account status", value: "Active", icon: ShieldCheck },
  ];

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-primary/20 text-lg text-primary">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold">{user.name}</h2>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5" />
            Verified
          </span>
        </div>

        <dl className="mt-6 divide-y divide-border/60 border-t border-border/60">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <div
                key={detail.label}
                className="flex items-center gap-3 py-3.5"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </span>
                <dt className="text-sm text-muted-foreground">
                  {detail.label}
                </dt>
                <dd className="ml-auto truncate text-sm font-medium">
                  {detail.value}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="ghost"
            nativeButton={false}
            className="gap-2 rounded-full px-4"
            render={
              <Link href="/dashboard">
                <ArrowLeft className="size-4" />
                Back to dashboard
              </Link>
            }
          />
          <Button
            variant="destructive"
            className="gap-2 rounded-full px-5"
            onClick={() => router.push("/logout")}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </div>

      <p className="mt-4 px-1 text-xs text-muted-foreground">
        Your session is stored locally on this device. Logging out clears it
        and returns you to the homepage.
      </p>
    </div>
  );
}
