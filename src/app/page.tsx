import { Suspense } from "react";

import { Banner } from "@/components/home/banner";
import {
  FeaturedGridSkeleton,
  FeaturedStudiosList,
  SectionHeading,
} from "@/components/home/featured-studios";
import { CategoryBrowser } from "@/components/home/category-browser";
import { HowItWorks, HostGuarantee } from "@/components/home/how-it-works";

export default function Home() {
  return (
    <>
      <Banner />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Featured studios"
          title="Top-rated spaces, ready to book."
          description="The six highest-rated studios on the platform — refreshed live from our listings."
          action={{ href: "/studios", label: "Explore all studios" }}
        />
        <Suspense fallback={<FeaturedGridSkeleton />}>
          <FeaturedStudiosList />
        </Suspense>
      </section>

      <CategoryBrowser />

      <HowItWorks />

      <HostGuarantee />
    </>
  );
}
