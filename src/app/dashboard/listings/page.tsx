import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle, Star } from "lucide-react";

import { DashboardShell } from "@/components/auth/dashboard-shell";
import { getFeaturedStudios } from "@/lib/studios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Studio Listings" };

export default async function MyListingsPage() {
  const studios = await getFeaturedStudios();
  const listings = studios.slice(0, 3).map((studio, index) => ({
    ...studio,
    status: index === 2 ? "In review" : "Live",
    bookings: [24, 11, 6][index],
  }));

  return (
    <DashboardShell
      title="My Studio Listings"
      description="Manage your spaces, pricing and availability."
    >
      <div className="mb-6 flex justify-end">
        <Button
          className="rounded-full"
          nativeButton={false}
          render={
            <Link href="/dashboard/add-studio">
              <PlusCircle className="size-4" />
              Add New Studio
            </Link>
          }
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <ul className="divide-y divide-border/60">
          {listings.map((listing) => (
            <li
              key={listing.id}
              className="flex flex-wrap items-center justify-between gap-4 p-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold">{listing.title}</p>
                  <Badge
                    variant={listing.status === "Live" ? "default" : "secondary"}
                    className="rounded-full"
                  >
                    {listing.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {listing.location} · {listing.bookings} bookings ·{" "}
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3 fill-primary text-primary" />
                    {listing.rating.toFixed(1)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-primary">
                  ${listing.hourlyRate} / hr
                </p>
                <Button variant="outline" size="sm" className="rounded-full">
                  Edit
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardShell>
  );
}
