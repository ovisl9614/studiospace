import { cacheLife } from "next/cache";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import {
  SEED_STUDIOS,
  type Studio,
  type StudioCategoryId,
  STUDIO_CATEGORIES,
} from "@/lib/studio-data";

// Re-exported so Server Components can keep importing from this module.
export { STUDIO_CATEGORIES, type Studio, type StudioCategoryId };

function fromSeed(limit?: number): Studio[] {
  const featured = [...SEED_STUDIOS].sort(
    (a, b) => b.rating - a.rating || b.reviews - a.reviews
  );
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

/**
 * Featured studios for the home page: the 6 top-rated listings, fetched from
 * MongoDB when configured (`.limit(6)`), otherwise from the seed collection.
 */
export async function getFeaturedStudios(): Promise<Studio[]> {
  "use cache";
  cacheLife("minutes");

  if (!isMongoConfigured) return fromSeed(6);

  try {
    const db = await getDb();
    const docs = await db!
      .collection<Studio>("studios")
      .find({})
      .sort({ rating: -1, reviews: -1 })
      .limit(6)
      .toArray();

    if (docs.length === 0) return fromSeed(6);
    return docs.map(({ _id, ...rest }) => ({ ...rest, id: String(_id) }));
  } catch {
    return fromSeed(6);
  }
}

/** All studios, used by the /studios browse page. */
export async function getAllStudios(): Promise<Studio[]> {
  "use cache";
  cacheLife("minutes");

  if (!isMongoConfigured) return fromSeed();

  try {
    const db = await getDb();
    const docs = await db!
      .collection<Studio>("studios")
      .find({})
      .sort({ rating: -1 })
      .limit(50)
      .toArray();

    if (docs.length === 0) return fromSeed();
    return docs.map(({ _id, ...rest }) => ({ ...rest, id: String(_id) }));
  } catch {
    return fromSeed();
  }
}

export async function getStudioById(id: string): Promise<Studio | undefined> {
  "use cache";
  cacheLife("minutes");

  const studios = await getAllStudios();
  return studios.find((studio) => studio.id === id);
}
