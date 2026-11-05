"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BannerSlide } from "@/components/home/banner-row";

const BANNER_SLIDES = [
  { image: "/images/default-banner.jpg", label: "Photo Studios" },
  {
    image:
      "/images/pngtree-a-film-studio-set-featuring-multiple-cameras-bright-lights-and-equipment-image_17133353.jpg",
    label: "Sound Stages",
  },
  { image: "/images/images.jpg", label: "Podcast Rooms & Music Suites" },
] as const satisfies readonly BannerSlide[];

/**
 * Swiper calls `new Date()` while initializing, which Next's prerender rejects
 * as an unstable value in Client Components — so the interactive row only
 * mounts on the client. Until then a static row of the same images renders,
 * keeping the banner visuals (and LCP) in the prerendered HTML.
 */
const BannerRowCarousel = dynamic(
  () =>
    import("@/components/home/banner-row").then((module) => ({
      default: module.BannerRow,
    })),
  {
    ssr: false,
    loading: () => <BannerRowFallback />,
  }
);

function BannerRowFallback() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {BANNER_SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className="relative aspect-[3/2] w-[82%] shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 sm:w-[46%] lg:w-[31%]"
        >
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            preload={index === 0}
            loading="eager"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 32vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Home banner: punchy headline, subtext and the two primary CTAs above a
 * full-bleed slider of high-resolution studio visuals.
 */
export function Banner() {
  return (
    <section className="relative w-full overflow-hidden py-10 md:py-14">
      {/* Green edge glows, echoing the banner design's ambient lighting. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_-5%_50%,oklch(0.65_0.15_150/25%)_0%,transparent_70%),radial-gradient(45%_60%_at_105%_50%,oklch(0.65_0.15_150/18%)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="glow-radial pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-6xl px-4">
        <h1 className="max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance md:text-6xl">
          Find the Perfect Studio for Your Next{" "}
          <span className="text-primary">Shoot.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
          Photo studios, sound stages, podcast rooms and music suites — book
          them by the hour with instant confirmation, verified hosts and no
          back-and-forth.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/studios"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px_var(--brand-lime)] transition-transform hover:scale-[1.03]"
          >
            Explore Studios
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/studios"
            className="inline-flex h-12 items-center rounded-full border border-border bg-card/70 px-7 text-sm font-semibold backdrop-blur transition-colors hover:bg-card"
          >
            Host Your Space
          </Link>
        </div>
      </div>

      <div className="mt-10 w-full">
        <BannerRowCarousel slides={BANNER_SLIDES} />
      </div>
    </section>
  );
}
