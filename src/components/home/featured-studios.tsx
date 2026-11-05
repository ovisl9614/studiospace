import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFeaturedStudios } from "@/lib/studios";
import { StudioCard } from "@/components/home/studio-card";
import { Skeleton } from "@/components/ui/skeleton";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}

function FeaturedGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-border/60">
          <Skeleton className="aspect-[4/3] w-full rounded-none bg-muted/60" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-3/4 bg-muted/60" />
            <Skeleton className="h-3.5 w-1/2 bg-muted/60" />
            <Skeleton className="h-3.5 w-full bg-muted/60" />
            <Skeleton className="h-7 w-28 rounded-full bg-muted/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function FeaturedStudiosList() {
  const studios = await getFeaturedStudios();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </div>
  );
}

export { FeaturedGridSkeleton, FeaturedStudiosList };
