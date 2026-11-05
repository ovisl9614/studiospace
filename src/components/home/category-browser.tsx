import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic,
  Music,
  Palette,
  ArrowRight,
} from "lucide-react";

import { STUDIO_CATEGORIES } from "@/lib/studios";
import { SectionHeading } from "@/components/home/featured-studios";

const ICONS = {
  camera: Camera,
  clapperboard: Clapperboard,
  mic: Mic,
  music: Music,
  palette: Palette,
} as const;

const DESCRIPTIONS: Record<(typeof STUDIO_CATEGORIES)[number]["id"], string> = {
  "photo-studios": "Cycloramas, natural light lofts and blackout stages",
  "sound-stages": "Rigged floors with grids, green screen and grip",
  "podcast-rooms": "Treated rooms with broadcast mics and switchers",
  "music-suites": "Tracking rooms, iso booths and backline included",
  "art-workshops": "Wheels, kilns, easels and wide-open making space",
};

export function CategoryBrowser() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
      <SectionHeading
        eyebrow="Browse by category"
        title="Every kind of creative space."
        description="Pick the room that fits the work — each category is curated with gear, access and host standards in mind."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STUDIO_CATEGORIES.map((category) => {
          const Icon = ICONS[category.icon];
          return (
            <Link
              key={category.id}
              href={`/studios?category=${category.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_oklch(0.88_0.21_128_/_60%)]"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{category.label}</span>
                <span className="block text-sm text-muted-foreground">
                  {DESCRIPTIONS[category.id]}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}

        <Link
          href="/studios"
          className="group flex items-center gap-4 rounded-2xl border border-dashed border-border/60 p-5 transition-colors hover:border-primary/50 hover:bg-card/60"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <ArrowRight className="size-5" />
          </span>
          <span>
            <span className="block font-semibold">View all studios</span>
            <span className="block text-sm text-muted-foreground">
              Filter by category, price and rating
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
