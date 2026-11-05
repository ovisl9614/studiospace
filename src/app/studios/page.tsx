import { Suspense } from "react";
import Link from "next/link";

import { getAllStudios, STUDIO_CATEGORIES } from "@/lib/studios";
import { StudioCard } from "@/components/home/studio-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SearchParams = Promise<{ category?: string | string[] }>;

function readCategory(params: { category?: string | string[] }) {
  return typeof params.category === "string" ? params.category : undefined;
}

function categoryHref(id?: string) {
  return id ? `/studios?category=${id}` : "/studios";
}

async function StudioResults({ searchParams }: { searchParams: SearchParams }) {
  const category = readCategory(await searchParams);
  const studios = await getAllStudios();
  const filtered = category
    ? studios.filter((studio) => studio.category === category)
    : studios;

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 p-14 text-center">
        <p className="text-lg font-semibold">No studios in this category yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try another category, or check back soon — new spaces go live daily.
        </p>
        <Link
          href="/studios"
          className="mt-6 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          View all studios
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((studio) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </div>
  );
}

async function StudiosHeader({ searchParams }: { searchParams: SearchParams }) {
  const active = readCategory(await searchParams);
  const activeLabel = STUDIO_CATEGORIES.find(
    (category) => category.id === active
  )?.label;

  return (
    <>
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Explore studios
      </p>
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
        {activeLabel ?? "Find your next creative space."}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        {activeLabel
          ? `${activeLabel} available to book by the hour, with instant confirmation.`
          : "Browse verified studios across every category — filter down to the room that fits your shoot."}
      </p>
    </>
  );
}

async function CategoryFilter({ searchParams }: { searchParams: SearchParams }) {
  const active = readCategory(await searchParams);

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      <Link
        href={categoryHref()}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
          !active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border/60 bg-card text-foreground/80 hover:border-primary/40"
        )}
      >
        All Studios
      </Link>
      {STUDIO_CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={categoryHref(category.id)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === category.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/60 bg-card text-foreground/80 hover:border-primary/40"
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}

function HeaderFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-32 bg-muted/60" />
      <Skeleton className="h-10 w-96 max-w-full bg-muted/60" />
      <Skeleton className="h-5 w-full max-w-xl bg-muted/60" />
    </div>
  );
}

function ChipsFallback() {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-28 rounded-full bg-muted/60" />
      ))}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-border/60"
        >
          <Skeleton className="aspect-[4/3] w-full rounded-none bg-muted/60" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-3/4 bg-muted/60" />
            <Skeleton className="h-3.5 w-1/2 bg-muted/60" />
            <Skeleton className="h-7 w-28 rounded-full bg-muted/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StudiosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
      <Suspense fallback={<HeaderFallback />}>
        <StudiosHeader searchParams={searchParams} />
      </Suspense>

      <div className="mt-10">
        <Suspense fallback={<ChipsFallback />}>
          <CategoryFilter searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<ResultsSkeleton />}>
          <StudioResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
