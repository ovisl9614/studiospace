import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/auth/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: {
    default: "StudioSpace — Book Creative Spaces by the Hour",
    template: "%s · StudioSpace",
  },
  description:
    "Discover and book photo studios, sound stages, podcast rooms and music suites by the hour. Instant confirmation, verified hosts, hourly rates.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
