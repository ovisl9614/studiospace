import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Globe2, Sparkles } from "lucide-react";

import { LogoMark } from "@/components/layout/logo";

export const metadata: Metadata = { title: "About Us" };

const VALUES = [
  {
    icon: Sparkles,
    title: "Creators first",
    description:
      "Every decision starts with the person on set. Booking should never be the hard part of a shoot day.",
  },
  {
    icon: HeartHandshake,
    title: "Fair to hosts",
    description:
      "Hosts keep the majority of every booking, with transparent fees and payouts that land on time.",
  },
  {
    icon: Globe2,
    title: "Every city",
    description:
      "From Brooklyn sound stages to Austin black boxes — StudioSpace is built for wherever the work is.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
      <div className="glow-radial pointer-events-none absolute inset-x-0 top-0 -z-10 h-80" />

      <div className="max-w-3xl">
        <LogoMark className="size-12 rounded-2xl" />
        <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
          We are building the way creative spaces get booked.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          StudioSpace started with a simple frustration: booking a studio meant
          dozens of DMs, vague pricing and uncertain availability. We thought
          the process should feel as sharp as the work made inside those walls.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Today, thousands of creators use StudioSpace to find, book and produce
          in verified photo studios, sound stages, podcast rooms, music suites
          and art workshops — all by the hour, all with instant confirmation.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {VALUES.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{value.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-3xl border border-border/60 bg-card/60 p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Ready to find your space?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Browse verified studios across the country, or list your own and start
          earning from the hours you are not using it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/studios"
            className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px_var(--brand-lime)] transition-transform hover:scale-[1.03]"
          >
            Explore Studios
          </Link>
          <Link
            href="/dashboard/add-studio"
            className="inline-flex h-11 items-center rounded-full border border-border bg-background/60 px-6 text-sm font-semibold backdrop-blur transition-colors hover:bg-background"
          >
            Host Your Space
          </Link>
        </div>
      </div>
    </div>
  );
}
