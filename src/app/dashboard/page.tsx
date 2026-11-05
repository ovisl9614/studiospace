import type { Metadata } from "next";
import Link from "next/link";
import { Star, CalendarDays, Building2, PlusCircle } from "lucide-react";

import { DashboardShell } from "@/components/auth/dashboard-shell";
import { getAllStudios } from "@/lib/studios";

export const metadata: Metadata = { title: "Dashboard" };

const STATS = [
  { label: "Active listings", value: "3", icon: Building2 },
  { label: "Bookings this month", value: "12", icon: CalendarDays },
  { label: "Average rating", value: "4.9", icon: Star },
  { label: "Earnings (30d)", value: "$4,820", icon: PlusCircle },
];

export default async function DashboardPage() {
  const studios = await getAllStudios();
  const recent = studios.slice(0, 3);

  return (
    <DashboardShell
      title="Welcome back"
      description="Here is what is happening across your spaces."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/60 bg-card p-5"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <Icon className="size-4" />
              </span>
              <p className="mt-4 text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold">Recently booked spaces</h2>
          <Link
            href="/studios"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Explore more
          </Link>
        </div>
        <ul className="divide-y divide-border/60">
          {recent.map((studio) => (
            <li
              key={studio.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div>
                <p className="font-medium">{studio.title}</p>
                <p className="text-sm text-muted-foreground">
                  {studio.location}
                </p>
              </div>
              <p className="text-sm font-semibold text-primary">
                ${studio.hourlyRate} / hr
              </p>
            </li>
          ))}
        </ul>
      </div>
    </DashboardShell>
  );
}
