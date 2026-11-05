import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The StudioSpace mark (from public/images/icon-mark.png — the brand artwork
 * cropped to the symbol and cut out to transparency). It ships as lavender on
 * white, so it sits on a light app-icon tile to stay readable on the dark
 * theme.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-xl bg-white/95 ring-1 ring-border/60",
        className
      )}
    >
      <Image
        src="/images/icon-mark.png"
        alt=""
        fill
        sizes="48px"
        className="object-cover"
      />
    </span>
  );
}

/** Full logo: the mark plus the two-tone StudioSpace wordmark. */
export function Logo({
  href = "/",
  markClassName,
  wordmarkClassName,
  className,
}: {
  href?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "text-lg leading-none font-bold tracking-tight",
          wordmarkClassName
        )}
      >
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  );
}
