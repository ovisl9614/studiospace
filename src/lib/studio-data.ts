/**
 * Pure, environment-agnostic studio constants, types and seed data.
 *
 * This module deliberately imports nothing from `next/cache`, `mongodb` or any
 * other server-only package, so it is safe to import from Client Components.
 */

export const STUDIO_CATEGORIES = [
  { id: "photo-studios", label: "Photo Studios", icon: "camera" },
  { id: "sound-stages", label: "Sound Stages", icon: "clapperboard" },
  { id: "podcast-rooms", label: "Podcast Rooms", icon: "mic" },
  { id: "music-suites", label: "Music Suites", icon: "music" },
  { id: "art-workshops", label: "Art Workshops", icon: "palette" },
] as const;

export type StudioCategoryId = (typeof STUDIO_CATEGORIES)[number]["id"];

export type Studio = {
  id: string;
  title: string;
  category: StudioCategoryId;
  location: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  amenities: string[];
  host: string;
  verified: boolean;
};

/**
 * Seed collection used as a fallback when MONGODB_URI is not configured, so
 * the site is fully browsable in development without a database.
 */
export const SEED_STUDIOS: Studio[] = [
  {
    id: "seed-1",
    title: "Lumen Cyclorama Photo Studio",
    category: "photo-studios",
    location: "Bushwick, Brooklyn NY",
    hourlyRate: 85,
    rating: 4.9,
    reviews: 132,
    image: "/images/default-banner.jpg",
    description:
      "A 1,400 sq ft blackout studio with a 20ft white cyclorama, ceiling grid and drive-in access for large set builds.",
    amenities: ["Cyclorama", "Ceiling grid", "Drive-in access", "Makeup room"],
    host: "Lumen Spaces",
    verified: true,
  },
  {
    id: "seed-2",
    title: "Reel House Sound Stage A",
    category: "sound-stages",
    location: "Astoria, Queens NY",
    hourlyRate: 165,
    rating: 4.8,
    reviews: 87,
    image: "/images/pngtree-a-film-studio-set-featuring-multiple-cameras-bright-lights-and-equipment-image_17133353.jpg",
    description:
      "Fully rigged sound stage with tungsten lighting package, green screen wall and 3-phase power for heavy grip builds.",
    amenities: ["Soundproofed", "Green screen", "Lighting package", "Parking"],
    host: "Reel House Studios",
    verified: true,
  },
  {
    id: "seed-3",
    title: "The Green Room Podcast Suite",
    category: "podcast-rooms",
    location: "Williamsburg, Brooklyn NY",
    hourlyRate: 45,
    rating: 5.0,
    reviews: 214,
    image: "/images/images.jpg",
    description:
      "Broadcast-ready four-mic podcast room with acoustic treatment, RGB set design and an in-house audio engineer on request.",
    amenities: ["4-mic setup", "Acoustic panels", "Live switcher", "Streaming ready"],
    host: "Green Room Collective",
    verified: true,
  },
  {
    id: "seed-4",
    title: "Analog Heart Music Suite",
    category: "music-suites",
    location: "Nashville, East Side TN",
    hourlyRate: 70,
    rating: 4.7,
    reviews: 96,
    image: "/images/default-banner.jpg",
    description:
      "Warm tracking room with a vintage console, grand piano and isolation booth — tuned for bands and solo artists alike.",
    amenities: ["Grand piano", "Iso booth", "Analog console", "Backline"],
    host: "Analog Heart",
    verified: false,
  },
  {
    id: "seed-5",
    title: "Claywork Art Workshop",
    category: "art-workshops",
    location: "Arts District, Los Angeles CA",
    hourlyRate: 55,
    rating: 4.9,
    reviews: 63,
    image: "/images/images.jpg",
    description:
      "Hands-on ceramics and painting workshop with 12 wheel stations, kiln access and north-facing natural light.",
    amenities: ["12 stations", "Kiln access", "Natural light", "Sink area"],
    host: "Claywork LA",
    verified: true,
  },
  {
    id: "seed-6",
    title: "Nightfall Cinematic Stage",
    category: "sound-stages",
    location: "Downtown, Austin TX",
    hourlyRate: 195,
    rating: 5.0,
    reviews: 41,
    image: "/images/pngtree-a-film-studio-set-featuring-multiple-cameras-bright-lights-and-equipment-image_17133353.jpg",
    description:
      "4,000 sq ft black box stage with dolly track, haze machine and a client lounge overlooking the floor.",
    amenities: ["Dolly track", "Client lounge", "Haze machine", "Catering kitchen"],
    host: "Nightfall Productions",
    verified: true,
  },
  {
    id: "seed-7",
    title: "Daylight Loft Photo Studio",
    category: "photo-studios",
    location: "Mission District, San Francisco CA",
    hourlyRate: 95,
    rating: 4.6,
    reviews: 78,
    image: "/images/images.jpg",
    description:
      "South-facing loft with 14ft windows, white oak floors and a full kitchen set for lifestyle and food shoots.",
    amenities: ["Natural light", "Kitchen set", "Wardrobe rack", "Freight elevator"],
    host: "Daylight Loft",
    verified: false,
  },
  {
    id: "seed-8",
    title: "Broadcast Blue Podcast Room",
    category: "podcast-rooms",
    location: "River North, Chicago IL",
    hourlyRate: 60,
    rating: 4.8,
    reviews: 119,
    image: "/images/default-banner.jpg",
    description:
      "Two-seat video podcast studio with 4K cameras, teleprompter and same-day edited clips included.",
    amenities: ["4K cameras", "Teleprompter", "Same-day clips", "Guest parking"],
    host: "Broadcast Blue",
    verified: true,
  },
];
