import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const CURRENT_YEAR = 2026;

/** Feather-style glyphs — lucide ships no brand icons. */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/studios", label: "Explore Studios" },
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/about", label: "About Us" },
    ],
  },
  {
    title: "Hosts",
    links: [
      { href: "/dashboard/add-studio", label: "Add New Studio" },
      { href: "/dashboard/listings", label: "My Studio Listings" },
      { href: "/dashboard/bookings", label: "My Bookings" },
    ],
  },
  {
    title: "Popular categories",
    links: [
      { href: "/studios?category=photo-studios", label: "Photo Studios" },
      { href: "/studios?category=sound-stages", label: "Sound Stages" },
      { href: "/studios?category=podcast-rooms", label: "Podcast Rooms" },
      { href: "/studios?category=music-suites", label: "Music Suites" },
      { href: "/studios?category=art-workshops", label: "Art Workshops" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://x.com/studiospace",
    label: "StudioSpace on X",
    icon: (
      /* The X logo — deliberately not the deprecated Twitter bird. */
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  { href: "https://instagram.com/studiospace", label: "StudioSpace on Instagram", icon: <InstagramIcon /> },
  { href: "https://youtube.com/@studiospace", label: "StudioSpace on YouTube", icon: <YoutubeIcon /> },
  { href: "https://linkedin.com/company/studiospace", label: "StudioSpace on LinkedIn", icon: <LinkedinIcon /> },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]">
        <div className="max-w-xs">
          <Logo markClassName="size-9" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Book photo studios, sound stages and creative spaces by the hour —
            in any city, with instant confirmation.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            Stay in the loop
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            New spaces, city launches and booking tips — one email a month, no
            spam.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {CURRENT_YEAR} StudioSpace. All rights reserved. By using
            StudioSpace you agree to our{" "}
            <Link href="/about" className="underline underline-offset-2 hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/about" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="shrink-0">Made for creators, everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
