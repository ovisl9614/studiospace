"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";

import "swiper/css";

export type BannerSlide = {
  image: string;
  label: string;
};

/**
 * Full-bleed row of studio image cards. More slides than fit on screen (and a
 * duplicated set) keep the Swiper loop seamless, mirroring the edge-to-edge
 * gallery look of the banner design.
 */
export function BannerRow({ slides }: { slides: readonly BannerSlide[] }) {
  const looped = [...slides, ...slides];

  return (
    <Swiper
      modules={[Autoplay, Keyboard]}
      autoplay={{ delay: 2600, disableOnInteraction: false }}
      loop
      speed={900}
      grabCursor
      keyboard={{ enabled: true }}
      spaceBetween={16}
      breakpoints={{
        0: { slidesPerView: 1.25 },
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.15 },
        1440: { slidesPerView: 3.6 },
      }}
      className="banner-swiper w-full"
    >
      {looped.map((slide, index) => (
        <SwiperSlide key={`${slide.image}-${index}`}>
          <Link
            href="/studios"
            className="group relative block aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-border/60"
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 32vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent p-4 pt-12 text-sm font-semibold">
              {slide.label}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
