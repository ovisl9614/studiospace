import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { DashboardShell } from "@/components/auth/dashboard-shell";
import { getFeaturedStudios } from "@/lib/studios";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "My Bookings" };

const BOOKINGS = [
  { studioIndex: 0, date: "Mar 14, 2026 · 9:00 AM – 2:00 PM", status: "Confirmed" },
  { studioIndex: 2, date: "Mar 21, 2026 · 6:00 PM – 9:00 PM", status: "Confirmed" },
  { studioIndex: 5, date: "Feb 28, 2026 · 10:00 AM – 6:00 PM", status: "Completed" },
];

export default async function MyBookingsPage() {
  const studios = await getFeaturedStudios();

  return (
    <DashboardShell
      title="My Bookings"
      description="Every upcoming and past session, in one place."
    >
      <div className="grid gap-4">
        {BOOKINGS.map((booking) => {
          const studio = studios[booking.studioIndex];
          if (!studio) return null;
          return (
            <div
              key={booking.date}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold">{studio.title}</p>
                  <Badge
                    variant={
                      booking.status === "Completed" ? "secondary" : "default"
                    }
                    className="rounded-full"
                  >
                    {booking.status}
                  </Badge>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {booking.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {studio.location}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-primary">
                  ${studio.hourlyRate * 5} total
                </p>
                <Link
                  href={`/studios/${studio.id}`}
                  className="inline-flex h-8 items-center rounded-full border border-border/80 px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                  View Studio
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
