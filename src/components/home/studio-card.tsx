import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowUpRight } from "lucide-react";

import type { Studio } from "@/lib/studios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STUDIO_CATEGORIES } from "@/lib/studios";

const CATEGORY_LABEL = new Map(
  STUDIO_CATEGORIES.map((category) => [category.id, category.label])
);

export function StudioCard({ studio }: { studio: Studio }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors hover:border-primary/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 border border-border/60 bg-background/80 text-foreground backdrop-blur"
        >
          {CATEGORY_LABEL.get(studio.category) ?? studio.category}
        </Badge>
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 gap-1 bg-background/80 text-foreground backdrop-blur"
        >
          <Star className="size-3 fill-primary text-primary" />
          {studio.rating.toFixed(1)}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base leading-snug font-semibold">
            <Link
              href={`/studios/${studio.id}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {studio.title}
            </Link>
          </h3>
          <p className="shrink-0 text-sm font-semibold text-primary">
            ${studio.hourlyRate}
            <span className="font-normal text-muted-foreground"> / hr</span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {studio.location}
        </p>

        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/70">
          {studio.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-xs text-muted-foreground">
            {studio.reviews} reviews · Hosted by {studio.host}
          </span>
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            className="relative z-10 rounded-full border-border/80 bg-background/60 backdrop-blur"
            render={
              <Link href={`/studios/${studio.id}`}>
                View Details
                <ArrowUpRight className="size-3.5" />
              </Link>
            }
          />
        </div>
      </div>
    </article>
  );
}
