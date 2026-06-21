// ─────────────────────────────────────────────────────────────
//  BRUT Realty — data model
//  Single source of truth consumed by home sections + pages.
// ─────────────────────────────────────────────────────────────

export type Neighbourhood = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  description: string[];
  avgRent: string;
  avgPrice: string;
  vibe: string[];
  highlights: { label: string; value: string }[];
  image: string;
  gallery: string[];
};

export type Listing = {
  id: number;
  slug: string;
  name: string;
  neighborhood: string;
  neighborhoodSlug: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  availability: string;
  type: "Rent" | "Sale" | "Off-Market";
  image: string;
  tagline: string;
  description: string[];
  features: string[];
  amenities: string[];
  gallery: string[];
  floorPlan?: string;
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string[];
  deliverables: string[];
  process: { step: string; title: string; body: string }[];
  startingPrice: string;
  image: string;
  icon: string; // lucide icon name
};

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  experience: string;
  specialization: string;
  neighborhood: string;
  bio: string;
  languages: string[];
  image: string;
  phone: string;
  email: string;
  deals: string;
};

// ─────────────────────────────────────────────────────────────
//  LISTINGS
// ─────────────────────────────────────────────────────────────
export const listings: Listing[] = [
  {
    id: 1,
    slug: "worli-sea-face-penthouse",
    name: "The Worli Sea Face Penthouse",
    neighborhood: "Worli",
    neighborhoodSlug: "worli",
    price: "₹8,50,000",
    beds: 4,
    baths: 4.5,
    sqft: "4,200",
    availability: "Available Now",
    type: "Rent",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
    tagline: "Wraparound sea-view terrace, private lift lobby, triple-aspect light.",
    description: [
      "Perched on the 38th floor of one of Worli's most discreet addresses, this 4-bedroom penthouse takes in the full sweep of the Arabian Sea from every principal room. A private lift lobby opens into a 28-ft double-height living space, flanked by a wraparound terrace that runs the length of the apartment.",
      "Inside, the layout is generous and considered — a separate formal dining room, an island kitchen with breakfast counter, and four en-suite bedrooms including a primary suite with a dressing room and private sit-out. Materials are warm and tactile: walnut joinery, travertine floors, brushed-brass fittings.",
      "Building amenities include a sea-facing infinity pool, a residents' spa, a 24-hour concierge, and four levels of covered parking. The Worli Sea Face promenade is a two-minute walk.",
    ],
    features: [
      "Private lift lobby",
      "28-ft double-height living",
      "Wraparound sea-view terrace (1,100 sq.ft.)",
      "Primary suite with dressing room",
      "Island kitchen with breakfast counter",
      "Home automation (lighting, climate, blinds)",
      "Four covered car parks",
    ],
    amenities: ["Infinity pool", "Resident spa", "24-hr concierge", "Gym & yoga deck", "Squash court", "Children's play area"],
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fe6ba90?w=1200&q=85",
    ],
  },
  {
    id: 2,
    slug: "bandra-west-sky-lofts",
    name: "Bandra West Sky Lofts",
    neighborhood: "Bandra West",
    neighborhoodSlug: "bandra-west",
    price: "₹4,80,000",
    beds: 3,
    baths: 3,
    sqft: "3,100",
    availability: "Available Sep",
    type: "Rent",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=85",
    tagline: "Double-height loft living in the heart of Bandra West.",
    description: [
      "A rare double-height loft in a low-rise Pali Hill block, this 3-bedroom residence is all about volume and light. The living space rises 18 ft, with floor-to-ceiling glazing facing a quiet inland lane.",
      "Two of the three bedrooms sit on a mezzanine level, connected by an open-tread steel staircase. The primary bedroom looks down into the living space; the second is set up as a study-cum-guest room.",
      "Carter Road and Bandstand are a short drive; Bandra's restaurants and cafés are walkable. The building has a small residents' gym and rooftop lounge.",
    ],
    features: [
      "18-ft double-height living",
      "Floor-to-ceiling glazing",
      "Mezzanine with two bedrooms",
      "Open-tread steel staircase",
      "Designer Italian kitchen",
      "Two covered car parks",
    ],
    amenities: ["Residents' gym", "Rooftop lounge", "24-hr security", "Power backup"],
    gallery: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=85",
    ],
  },
  {
    id: 3,
    slug: "juhu-beach-view-tower",
    name: "Juhu Beach View Tower",
    neighborhood: "Juhu",
    neighborhoodSlug: "juhu",
    price: "₹3,20,000",
    beds: 2,
    baths: 2.5,
    sqft: "2,400",
    availability: "Just Listed",
    type: "Rent",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    tagline: "Direct Juhu beach views from a high-floor 2BHK.",
    description: [
      "A bright, east-facing 2-bedroom on a high floor of Juhu Tara Road, with unobstructed views over Juhu beach and the sunrise. Both bedrooms and the living room face the sea.",
      "The apartment has been freshly refurbished — new floors, a re-laid modular kitchen, and two full bathrooms plus a guest powder room. A covered balcony extends the living space.",
      "Juhu beach is across the road; the area is known for its restaurants, cafés, and the Prithvi Theatre. Two covered car parks and 24-hr security come with the unit.",
    ],
    features: [
      "Direct beach views from all rooms",
      "Freshly refurbished throughout",
      "Modular kitchen",
      "Covered sea-facing balcony",
      "Two covered car parks",
    ],
    amenities: ["24-hr security", "Power backup", "Residents' gym", "Children's play area"],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
    ],
  },
  {
    id: 4,
    slug: "malabar-hill-estate",
    name: "Malabar Hill Estate",
    neighborhood: "Malabar Hill",
    neighborhoodSlug: "malabar-hill",
    price: "₹12,00,000",
    beds: 5,
    baths: 5.5,
    sqft: "5,500",
    availability: "Available Now",
    type: "Rent",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
    tagline: "A landmark Malabar Hill bungalow with sea views and a private pool.",
    description: [
      "Set on one of Malabar Hill's most prestigious addresses, this 5-bedroom bungalow offers a rare combination of space, privacy, and panoramic sea views. The property sits on a 8,000 sq.ft. plot with mature gardens.",
      "The ground floor is given over to formal living and dining, a library, and a chef's kitchen. The first floor holds four en-suite bedrooms, each with a private balcony. The primary suite occupies the top floor with a dressing room, private terrace, and study.",
      "Outdoor amenities include a 14-metre pool, a pool deck, a gazebo, staff quarters, and covered parking for six cars. This is one of the few Malabar Hill estates available on the rental market.",
    ],
    features: [
      "8,000 sq.ft. plot",
      "5 en-suite bedrooms",
      "14-metre private pool",
      "Mature landscaped gardens",
      "Library / study",
      "Staff quarters",
      "Covered parking for 6 cars",
    ],
    amenities: ["Private pool", "Gardens & gazebo", "Staff quarters", "Home automation", "Generator backup", "CCTV & access control"],
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    ],
  },
  {
    id: 5,
    slug: "powai-lake-residences",
    name: "Powai Lake Residences",
    neighborhood: "Powai",
    neighborhoodSlug: "powai",
    price: "₹2,40,000",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    availability: "Coming Soon",
    type: "Sale",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    tagline: "Lake-facing 2BHK in a full-amenity Powai township.",
    description: [
      "A lake-facing 2-bedroom residence in one of Powai's flagship gated townships. The apartment opens to a wide balcony overlooking Powai Lake and the surrounding hills.",
      "The layout is efficient and modern — open-plan living and dining, a fitted kitchen, two bedrooms with attached bathrooms, and a utility balcony. The building is part of a larger campus with schools, retail, and recreation on the doorstep.",
      "Residents have access to a clubhouse with pool, gym, sports courts, and landscaped gardens. Hiranandani Gardens and the Powai business district are minutes away.",
    ],
    features: [
      "Lake-facing balcony",
      "Open-plan living & dining",
      "Fitted modular kitchen",
      "Two covered car parks",
      "Clubhouse access",
    ],
    amenities: ["Swimming pool", "Clubhouse", "Gym & sports courts", "Landscaped gardens", "24-hr security", "School & retail on campus"],
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    ],
  },
  {
    id: 6,
    slug: "lower-parel-glass-villa",
    name: "Lower Parel Glass Villa",
    neighborhood: "Lower Parel",
    neighborhoodSlug: "lower-parel",
    price: "₹5,50,000",
    beds: 3,
    baths: 3.5,
    sqft: "3,600",
    availability: "Available Now",
    type: "Rent",
    image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=85",
    tagline: "A double-height glass-walled villa minutes from Lower Parel.",
    description: [
      "A contemporary 3-bedroom villa on the edge of Lower Parel, defined by its double-height glass-walled living space that opens onto a private garden and plunge pool.",
      "The ground floor holds the living and dining areas, an open kitchen, and a guest bedroom. The first floor has the primary suite and a second bedroom, both with private terraces.",
      "Lower Parel's offices, malls, and restaurants are a five-minute drive. The property includes a private garden, plunge pool, and two covered car parks.",
    ],
    features: [
      "Double-height glass-walled living",
      "Private garden & plunge pool",
      "Open-plan chef's kitchen",
      "Two terraces",
      "Two covered car parks",
    ],
    amenities: ["Private plunge pool", "Garden", "24-hr security", "Power backup", "Smart home system"],
    gallery: [
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    ],
  },
];

export const FILTERS = ["All", "Worli", "Bandra West", "Juhu", "Malabar Hill", "Powai", "Lower Parel"];

// ─────────────────────────────────────────────────────────────
//  OFF-MARKET LISTINGS (shown only on /off-market via contact)
// ─────────────────────────────────────────────────────────────
export const offMarketCount = 12;

// ─────────────────────────────────────────────────────────────
//  NEIGHBOURHOODS
// ─────────────────────────────────────────────────────────────
export const neighbourhoods: Neighbourhood[] = [
  {
    slug: "worli",
    name: "Worli",
    tagline: "Sea-face addresses & landmark towers",
    blurb: "Worli is Mumbai's most concentrated stretch of sea-front luxury, anchored by the Sea Face promenade and a string of landmark towers.",
    description: [
      "Worli sits on a thin peninsula jutting into the Arabian Sea, giving it the longest stretch of true sea-front residential addresses in South Mumbai. The Worli Sea Face promenade is the neighbourhood's spine — a 2-km walkway lined with the city's most established towers.",
      "The area is favoured by business owners, bankers, and senior professionals who want South Mumbai convenience with a sea view. The Bandra-Worli Sea Link connects Worli to the western suburbs in under 20 minutes.",
      "BRUT's Worli desk is run by Priya Mehta, who has placed clients in nearly every sea-front tower on the promenade.",
    ],
    avgRent: "₹3.5L–₹12L / mo",
    avgPrice: "₹60,000–₹1.2L / sq.ft.",
    vibe: ["Sea-front", "Established towers", "Quiet residential", "Business-adjacent"],
    highlights: [
      { label: "Promenade", value: "Worli Sea Face, 2 km" },
      { label: "Sea Link", value: "Bandra in 18 min" },
      { label: "Landmark", value: "Worli Fort" },
      { label: "Schools", value: "ASB, BIS nearby" },
    ],
    image: "https://images.unsplash.com/photo-1577147443647-81df1675a2e2?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1577147443647-81df1675a2e2?w=1200&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    ],
  },
  {
    slug: "bandra-west",
    name: "Bandra West",
    tagline: "The suburb's lifestyle capital",
    blurb: "Bandra West blends heritage bungalows, sea-front apartments, and the city's best restaurants and cafés.",
    description: [
      "Bandra West is Mumbai's lifestyle capital — a stretch of leafy lanes between Carter Road, Bandstand, and Pali Hill, mixing heritage bungalows, low-rise apartments, and a new generation of designer towers.",
      "It's the neighbourhood of choice for film, media, and creative-industry professionals who want walkable streets, the sea front, and the city's densest cluster of restaurants, bars, and cafés.",
      "BRUT's Bandra desk is run by Arjun Sharma, who has closed some of the suburb's largest private transactions.",
    ],
    avgRent: "₹2.5L–₹8L / mo",
    avgPrice: "₹50,000–₹95,000 / sq.ft.",
    vibe: ["Walkable", "Restaurants & cafés", "Heritage lanes", "Sea front"],
    highlights: [
      { label: "Promenade", value: "Carter Road & Bandstand" },
      { label: "Dining", value: "200+ restaurants" },
      { label: "Stations", value: "Bandra, Khar Road" },
      { label: "Schools", value: "Dhirubhai Ambani, BIS" },
    ],
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=1200&q=85",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=85",
    ],
  },
  {
    slug: "malabar-hill",
    name: "Malabar Hill",
    tagline: "Mumbai's most exclusive address",
    blurb: "Malabar Hill is the city's most exclusive enclave — bungalows, embassies, and panoramic sea views.",
    description: [
      "Malabar Hill is the most exclusive residential enclave in Mumbai — a hilltop stretch of heritage bungalows, diplomatic residences, and a handful of apartment towers with panoramic views over the bay.",
      "The neighbourhood is quiet, green, and discreet. Properties here rarely come to the open market; most deals are private or off-market, which is why we run a dedicated desk for the area.",
      "BRUT's Malabar Hill desk is run by Nisha Patel, who maintains relationships with several of the hill's private owners.",
    ],
    avgRent: "₹8L–₹25L / mo",
    avgPrice: "₹90,000–₹1.5L / sq.ft.",
    vibe: ["Ultra-exclusive", "Bungalows & embassies", "Panoramic sea views", "Private"],
    highlights: [
      { label: "Landmark", value: "Hanging Gardens" },
      { label: "Views", value: "Marine Drive bay" },
      { label: "Privacy", value: "Mostly off-market" },
      { label: "Schools", value: "Campion, Cathedral" },
    ],
    image: "https://images.unsplash.com/photo-1613416295741-8e3b1a2a6c9e?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613416295741-8e3b1a2a6c9e?w=1200&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
    ],
  },
  {
    slug: "lower-parel",
    name: "Lower Parel",
    tagline: "Mumbai's business-district core",
    blurb: "Lower Parel is the heart of Mumbai's new business district — converted mills, glass towers, and rooftop dining.",
    description: [
      "Lower Parel is the gravitational centre of Mumbai's new business district, where the old textile mills have been redeveloped into offices, malls, and rooftop restaurants clustered around Phoenix and the World Trade Center.",
      "It's the neighbourhood of choice for senior executives who want to live a short walk from the office, with the city's best rooftop dining on the doorstep.",
      "BRUT's Lower Parel desk is run by Rohan Kapoor, whose office sits on Level 28 of One World Center.",
    ],
    avgRent: "₹2L–₹6L / mo",
    avgPrice: "₹40,000–₹75,000 / sq.ft.",
    vibe: ["Business district", "Rooftop dining", "Glass towers", "Walk-to-work"],
    highlights: [
      { label: "Offices", value: "WTC, Phoenix, A-Wing" },
      { label: "Dining", value: "Rooftop cluster" },
      { label: "Stations", value: "Lower Parel, Currey Road" },
      { label: "BRUT HQ", value: "One World Center L28" },
    ],
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    ],
  },
  {
    slug: "juhu",
    name: "Juhu",
    tagline: "Beach-front living in the western suburbs",
    blurb: "Juhu is the western suburbs' beach-front enclave — wide bungalows, sea-view apartments, and the city's best sunsets.",
    description: [
      "Juhu is the western suburbs' most established beach-front enclave, a stretch of wide bungalows and sea-view apartments fronting the longest public beach in the city.",
      "It's popular with film-industry families and executives who want a beach address without crossing into South Mumbai. The area has a strong restaurant and café scene and is close to the international airport.",
      "BRUT's Juhu desk is shared between Priya Mehta and Arjun Sharma.",
    ],
    avgRent: "₹2L–₹7L / mo",
    avgPrice: "₹40,000–₹80,000 / sq.ft.",
    vibe: ["Beach-front", "Bungalows", "Film industry", "Sunsets"],
    highlights: [
      { label: "Beach", value: "Juhu, 6 km long" },
      { label: "Airport", value: "T2 in 20 min" },
      { label: "Culture", value: "Prithvi Theatre" },
      { label: "Dining", value: "Beach-front cluster" },
    ],
    image: "https://images.unsplash.com/photo-1605648916969-9f5a5a0a6c4a?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605648916969-9f5a5a0a6c4a?w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    ],
  },
  {
    slug: "powai",
    name: "Powai",
    tagline: "Lake-side township living",
    blurb: "Powai is a planned lake-side township — gated campuses, full amenities, and the eastern suburbs' best quality of life.",
    description: [
      "Powai is a planned lake-side township in the eastern suburbs, built around Powai Lake and anchored by the Hiranandani Gardens campus. It's the most self-contained residential area in Mumbai, with schools, retail, hospitals, and recreation inside the gated campus.",
      "The neighbourhood attracts senior corporate professionals, expats, and families who want full-amenity living away from the central-city density.",
      "BRUT's Powai desk is run by Rohan Kapoor.",
    ],
    avgRent: "₹1.2L–₹3.5L / mo",
    avgPrice: "₹28,000–₹55,000 / sq.ft.",
    vibe: ["Lake-side", "Gated campus", "Full amenities", "Family-friendly"],
    highlights: [
      { label: "Lake", value: "Powai Lake" },
      { label: "Campus", value: "Hiranandani Gardens" },
      { label: "Schools", value: "Hiranandani, IIT nearby" },
      { label: "Airport", value: "T2 in 25 min" },
    ],
    image: "https://images.unsplash.com/photo-1605648917035-9f5a5a1a6c8b?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605648917035-9f5a5a1a6c8b?w=1200&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
//  SERVICES
// ─────────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    slug: "premium-rentals",
    name: "Premium Rentals",
    short: "Curated sea-front and tower apartments, fully vetted.",
    tagline: "3–5 hand-picked properties, not 200 listings.",
    description: [
      "Our premium rentals desk takes your brief — neighbourhood, budget, timeline, must-haves — and returns a shortlist of three to five properties that actually match it. Every property is pre-viewed by us before it reaches you.",
      "We handle the full rental cycle: negotiation, paperwork, registration, and the move-in handover. No broker-chain, no duplicate listings, no wasted weekend viewings.",
      "Most clients sign within 11 days of their first call.",
    ],
    deliverables: [
      "Curated shortlist of 3–5 properties",
      "Private viewings on your schedule",
      "Rent & terms negotiation",
      "Lease drafting & registration",
      "Move-in handover",
    ],
    process: [
      { step: "01", title: "Discovery call", body: "30 minutes to understand your brief." },
      { step: "02", title: "Curated matches", body: "3–5 properties within 48 hours." },
      { step: "03", title: "Private viewings", body: "On your schedule, no open houses." },
      { step: "04", title: "Close & register", body: "We negotiate, draft, and register." },
    ],
    startingPrice: "from 1 month's rent",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    icon: "Home",
  },
  {
    slug: "property-purchase",
    name: "Property Purchase",
    short: "Buy with confidence — title-checked, fairly priced.",
    tagline: "We check the title, the price, and the neighbourhood.",
    description: [
      "Buying in Mumbai is as much about what you don't see as what you do. Our purchase desk runs title and encumbrance checks, comparable-sale analysis, and a neighbourhood read on every property before we put it in front of you.",
      "We negotiate hard on price and terms, and we'll tell you to walk away from a deal that doesn't stack up — even if it costs us the commission.",
      "Our purchase clients have closed across Worli, Bandra, Malabar Hill, Lower Parel, Juhu, and Powai.",
    ],
    deliverables: [
      "Title & encumbrance due diligence",
      "Comparable-sale pricing analysis",
      "Negotiation on price & terms",
      "Sale agreement & registration",
      "Loan coordination with banks",
    ],
    process: [
      { step: "01", title: "Discovery call", body: "Budget, neighbourhoods, timeline." },
      { step: "02", title: "Due diligence", body: "We check title and pricing." },
      { step: "03", title: "Shortlist & view", body: "Only properties that pass." },
      { step: "04", title: "Negotiate & close", body: "Price, terms, registration." },
    ],
    startingPrice: "1% of sale value",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
    icon: "KeyRound",
  },
  {
    slug: "off-market-deals",
    name: "Off-Market Deals",
    short: "Properties that never reach the open market.",
    tagline: "12+ private deals active at any time.",
    description: [
      "Most of Mumbai's best properties never reach the open market. Owners prefer discretion, and the properties change hands through a small network of trusted brokers. We sit inside that network.",
      "Our off-market desk currently has 12+ private deals active across Worli, Bandra, Malabar Hill, and Lower Parel. To see them, you'll need to confirm serious interest with one of our brokers — we don't publish off-market inventory publicly.",
      "If you're a serious buyer or tenant with a defined brief, book a call and we'll share what's active.",
    ],
    deliverables: [
      "Access to 12+ active private deals",
      "Pre-market & quietly-listed properties",
      "Direct introduction to owners",
      "Discreet negotiation",
      "Same-day response",
    ],
    process: [
      { step: "01", title: "Confirmation call", body: "We confirm your brief is serious." },
      { step: "02", title: "Private inventory", body: "We share what's active." },
      { step: "03", title: "Private viewings", body: "Discreet, owner-introduced." },
      { step: "04", title: "Close", body: "Quietly, on your terms." },
    ],
    startingPrice: "by introduction",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
    icon: "Lock",
  },
  {
    slug: "investment-consulting",
    name: "Investment Consulting",
    short: "Buy-to-let and capital-growth strategy.",
    tagline: "Yield, growth, and exit — modelled before you buy.",
    description: [
      "Our investment desk models the buy-to-let yield and capital-growth case for every property we recommend, using ten years of Mumbai micro-market data.",
      "We advise on entry neighbourhood, hold horizon, and exit — and we'll tell you when a deal is a lifestyle purchase rather than an investment. Many of our clients use us to build multi-property portfolios.",
      "We work with both resident and NRI investors.",
    ],
    deliverables: [
      "Yield & capital-growth modelling",
      "Micro-market entry analysis",
      "Portfolio planning",
      "Tenant placement & management",
      "Quarterly portfolio reviews",
    ],
    process: [
      { step: "01", title: "Mandate", body: "Define yield vs growth mix." },
      { step: "02", title: "Model", body: "We build the financial case." },
      { step: "03", title: "Acquire", body: "Negotiate and close." },
      { step: "04", title: "Manage", body: "Tenant placement & reviews." },
    ],
    startingPrice: "0.5% of asset value",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85",
    icon: "TrendingUp",
  },
];

// ─────────────────────────────────────────────────────────────
//  TEAM
// ─────────────────────────────────────────────────────────────
export const team: TeamMember[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    title: "Founder & Director",
    experience: "15 Years",
    specialization: "Penthouses & Off-Market",
    neighborhood: "Bandra West",
    bio: "Arjun founded BRUT in 2009 after four frustrating months as a buyer. He still personally runs the Bandra desk and has closed some of the suburb's largest private transactions.",
    languages: ["English", "Hindi", "Marathi"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
    phone: "+91 98200 12345",
    email: "arjun@brutrealty.in",
    deals: "180+",
  },
  {
    id: 2,
    name: "Priya Mehta",
    title: "Principal Broker",
    experience: "12 Years",
    specialization: "Sea-Facing Estates",
    neighborhood: "Worli & Juhu",
    bio: "Priya runs the Worli and Juhu desks and has placed clients in nearly every sea-front tower on the Worli promenade. She started her career at a London agency before returning to Mumbai.",
    languages: ["English", "Hindi", "Gujarati"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85",
    phone: "+91 98200 23456",
    email: "priya@brutrealty.in",
    deals: "140+",
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    title: "VP of Acquisitions",
    experience: "10 Years",
    specialization: "Investment Properties",
    neighborhood: "Lower Parel & Powai",
    bio: "Rohan runs the Lower Parel and Powai desks and leads investment-consulting mandates. His office sits on Level 28 of One World Center, a five-minute walk from most of his inventory.",
    languages: ["English", "Hindi", "Punjabi"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=85",
    phone: "+91 98200 34567",
    email: "rohan@brutrealty.in",
    deals: "110+",
  },
  {
    id: 4,
    name: "Nisha Patel",
    title: "Senior Broker",
    experience: "8 Years",
    specialization: "New Developments",
    neighborhood: "Malabar Hill",
    bio: "Nisha runs the Malabar Hill desk and maintains relationships with several of the hill's private owners. Most of her deals never reach the open market.",
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=85",
    phone: "+91 98200 45678",
    email: "nisha@brutrealty.in",
    deals: "70+",
  },
];

// Kept for backwards-compatibility with any consumer expecting `brokers`.
export const brokers = team;

// ─────────────────────────────────────────────────────────────
//  TESTIMONIALS
// ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Vikram Khanna",
    property: "Worli Sea Face Penthouse",
    quote: "BRUT found me something I didn't know I needed. Off-market, perfect price, done in two weeks.",
    rating: 5,
  },
  {
    id: 2,
    name: "Pooja Sharma",
    property: "The Meridian Residences, Bandra",
    quote: "They actually listened. No time-wasting, no hard sell. Just results.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohan Nair",
    property: "Juhu Beach View Tower",
    quote: "Best real estate experience of my life. Honest, fast, and precise.",
    rating: 5,
  },
  {
    id: 4,
    name: "Anjali Kapoor",
    property: "Malabar Hill Estate",
    quote: "The process was shockingly painless. From first call to keys in hand — seamless.",
    rating: 5,
  },
  {
    id: 5,
    name: "Suresh Rajan",
    property: "Bandra West Sky Lofts",
    quote: "I've used four brokers in this city. BRUT is the only one I'd use again.",
    rating: 5,
  },
];

// ─────────────────────────────────────────────────────────────
//  PORTFOLIO (categorised — used by Gallery + on hover reveal)
// ─────────────────────────────────────────────────────────────
export type PortfolioCategory = "Interior" | "Exterior" | "Amenities";
export type PortfolioImage = {
  src: string;
  label: string;
  category: PortfolioCategory;
  property: string;
};

export const portfolio: PortfolioImage[] = [
  // ── Interior ──
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80", label: "Living Room", category: "Interior", property: "Worli Penthouse" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", label: "Kitchen", category: "Interior", property: "Lower Parel Villa" },
  { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80", label: "Dining", category: "Interior", property: "Malabar Estate" },
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80", label: "Bedroom", category: "Interior", property: "Bandra Lofts" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80", label: "Lounge", category: "Interior", property: "Powai Residences" },
  // ── Exterior ──
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80", label: "Façade", category: "Exterior", property: "Juhu Tower" },
  { src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=80", label: "Rooftop", category: "Exterior", property: "Lower Parel" },
  { src: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=80", label: "Lobby", category: "Exterior", property: "Glass Villa" },
  { src: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=900&q=80", label: "Terrace", category: "Exterior", property: "Bandra West" },
  // ── Amenities ──
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80", label: "Pool", category: "Amenities", property: "Malabar Estate" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80", label: "Gym", category: "Amenities", property: "Worli Penthouse" },
  { src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=900&q=80", label: "Garden", category: "Amenities", property: "Powai Residences" },
  { src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=900&q=80", label: "Lounge", category: "Amenities", property: "Lower Parel" },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80", label: "Spa", category: "Amenities", property: "Malabar Estate" },
];
