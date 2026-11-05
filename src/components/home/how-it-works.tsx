import Link from "next/link";
import {
  Search,
  Clock,
  Zap,
  Clapperboard,
  ShieldCheck,
  BadgeCheck,
  PackageCheck,
  Headphones,
} from "lucide-react";

import { SectionHeading } from "@/components/home/featured-studios";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Discover Spaces",
    description:
      "Search by city, category and gear. Every listing is verified with real photos and honest specs.",
  },
  {
    icon: Clock,
    step: "02",
    title: "Select Shoot Hours",
    description:
      "Pick the exact window you need — hourly, half-day or full-day. Pricing updates live as you choose.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Book Instantly",
    description:
      "Confirm and pay in one step. No waiting on hosts, no negotiation threads — access details arrive immediately.",
  },
  {
    icon: Clapperboard,
    step: "04",
    title: "Create & Produce",
    description:
      "Show up, plug in and shoot. Hosts are on call for anything you need during the session.",
  },
];

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Every booking includes up to $2M in liability coverage for equipment and on-site incidents.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Hosts pass ID, ownership and space verification before a listing ever goes live.",
  },
  {
    icon: PackageCheck,
    title: "Equipment Safety",
    description:
      "Gear inventories are documented at check-in and check-out, with damage claims handled by us.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    description:
      "Real humans on call around the clock — before, during and after every shoot.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
      <SectionHeading
        eyebrow="How booking works"
        title="From search to shoot in four steps."
        description="The whole flow is built to get out of your way — so you spend your time producing, not planning."
      />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.step}
              className="relative flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-primary">
                {item.step}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function HostGuarantee() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/60">
        <div className="glow-radial relative grid gap-10 p-8 md:grid-cols-2 md:p-12">
          <div className="relative">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Host guarantee &amp; creator support
            </p>
            <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl">
              Your gear, your space and your shoot — protected.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              Whether you are hosting a room or booking one, StudioSpace backs
              every hour on the floor with real coverage and real people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard/add-studio"
                className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px_var(--brand-lime)] transition-transform hover:scale-[1.03]"
              >
                Become a Host
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center rounded-full border border-border bg-background/60 px-6 text-sm font-semibold backdrop-blur transition-colors hover:bg-background"
              >
                Read Our Promise
              </Link>
            </div>
          </div>

          <dl className="relative grid gap-4 sm:grid-cols-2">
            {GUARANTEES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/60 bg-background/50 p-5 backdrop-blur"
                >
                  <dt className="flex items-center gap-2.5 font-semibold">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                      <Icon className="size-4.5" />
                    </span>
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
