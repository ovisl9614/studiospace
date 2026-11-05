import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  MapPin,
  BadgeCheck,
  ArrowLeft,
  CircleCheck,
  CalendarDays,
} from "lucide-react";

import { getAllStudios, getStudioById, STUDIO_CATEGORIES } from "@/lib/studios";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const studios = await getAllStudios();
  return studios.map((studio) => ({ id: studio.id }));
}

async function StudioOverview({ id }: { id: string }) {
  const studio = await getStudioById(id);
  if (!studio) notFound();

  const categoryLabel = STUDIO_CATEGORIES.find(
    (category) => category.id === studio.category
  )?.label;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border/60">
          <Image
            src={studio.image}
            alt={studio.title}
            fill
            preload
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
            {categoryLabel}
          </span>
          {studio.verified ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-primary">
              <BadgeCheck className="size-4" />
              Verified host
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
          {studio.title}
        </h1>

        <p className="mt-3 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" />
          {studio.location}
        </p>

        <p className="mt-6 leading-relaxed text-foreground/80">
          {studio.description}
        </p>

        <h2 className="mt-10 text-lg font-semibold">What this space offers</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {studio.amenities.map((amenity) => (
            <li
              key={amenity}
              className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm"
            >
              <CircleCheck className="size-4 shrink-0 text-primary" />
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 lg:sticky lg:top-28">
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-bold text-primary">
            ${studio.hourlyRate}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / hr
            </span>
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Star className="size-4 fill-primary text-primary" />
            <span className="font-semibold">{studio.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({studio.reviews})</span>
          </p>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-border/60 bg-background/50 p-4 text-sm">
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Host</span>
            <span className="font-medium">{studio.host}</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Minimum booking</span>
            <span className="font-medium">1 hour</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Cancellation</span>
            <span className="font-medium">Free up to 24h before</span>
          </p>
        </div>

        <Button
          nativeButton={false}
          className="mt-6 h-12 w-full rounded-full text-sm font-semibold shadow-[0_0_36px_-10px_var(--brand-lime)]"
          render={<Link href="/dashboard/bookings">Book Instantly</Link>}
        />

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          Instant confirmation — no waiting on the host
        </p>
      </aside>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <Skeleton className="aspect-[16/9] w-full rounded-3xl bg-muted/60" />
        <Skeleton className="h-8 w-2/3 bg-muted/60" />
        <Skeleton className="h-5 w-1/2 bg-muted/60" />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-14 rounded-xl bg-muted/60" />
          ))}
        </div>
      </div>
      <Skeleton className="h-80 rounded-3xl bg-muted/60" />
    </div>
  );
}

async function StudioPageBody({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <>
      <Link
        href="/studios"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to all studios
      </Link>

      <Suspense key={id} fallback={<OverviewSkeleton />}>
        <StudioOverview id={id} />
      </Suspense>
    </>
  );
}

export default function StudioDetailPage({ params }: { params: Params }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <Suspense fallback={<OverviewSkeleton />}>
        <StudioPageBody params={params} />
      </Suspense>
    </div>
  );
}
