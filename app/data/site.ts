export type PropertyType =
  | "Villa"
  | "Estate"
  | "Penthouse"
  | "House"
  | "Townhouse"
  | "Apartment";

export type Agent = {
  id: string;
  name: string;
  role: string;
  photo: string;
  phone: string;
  email: string;
  focus: string;
};

export type Property = {
  slug: string;
  name: string;
  type: PropertyType;
  city: string;
  region: string;
  country: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  featured: boolean;
  summary: string;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  agentId: string;
};

export const agents: Agent[] = [
  {
    id: "daniel-morgan",
    name: "Daniel Morgan",
    role: "Managing Director",
    focus: "Private client representation across architectural estates.",
    photo: "photo-1560250097-0b93528c311a",
    phone: "(555) 246-7890",
    email: "daniel@horizonproperties.com",
  },
  {
    id: "olivia-carter",
    name: "Olivia Carter",
    role: "Luxury Property Advisor",
    focus: "Coastal and architect-designed residences.",
    photo: "photo-1573497019940-1c28c88b4f3e",
    phone: "(555) 246-7894",
    email: "olivia@horizonproperties.com",
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Investment Consultant",
    focus: "Yield analysis and portfolio acquisitions.",
    photo: "photo-1507003211169-0a1dd7228f2d",
    phone: "(555) 246-7897",
    email: "james@horizonproperties.com",
  },
  {
    id: "sophia-bennett",
    name: "Sophia Bennett",
    role: "Senior Property Specialist",
    focus: "Relocation and off-market listings.",
    photo: "photo-1573496359142-b8d87734a5a2",
    phone: "(555) 246-7901",
    email: "sophia@horizonproperties.com",
  },
];

export const properties: Property[] = [
  {
    slug: "lakeside-modern-villa",
    name: "Lakeside Modern Villa",
    type: "Villa",
    city: "Austin",
    region: "Texas",
    country: "USA",
    price: 2350000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    year: 2021,
    featured: true,
    summary: "A glass-and-limestone villa opening onto a private lakefront terrace.",
    description:
      "Set on a quiet stretch of shoreline, Lakeside Modern Villa pairs generous glazing with warm limestone and oak. Living spaces flow to an infinity-edge pool and a covered terrace designed for long evenings. The primary suite occupies its own wing with a spa bath and private garden.",
    features: [
      "Floor-to-ceiling lakeside glazing",
      "Infinity-edge pool and sun terrace",
      "Chef's kitchen with stone island",
      "Primary wing with spa bathroom",
      "Covered outdoor lounge with fireplace",
    ],
    amenities: [
      "Infinity pool",
      "Private boat dock",
      "Heated floors",
      "Home cinema",
      "Smart lighting",
      "3-car garage",
    ],
    images: [
      "photo-1600585154340-be6161a56a0c",
      "photo-1600210492486-724fe5c67fb0",
      "photo-1600607687939-ce8a6c25118c",
      "photo-1600566753086-00f18fb6b3ea",
    ],
    agentId: "olivia-carter",
  },
  {
    slug: "pacific-glass-house",
    name: "Pacific Glass House",
    type: "Villa",
    city: "Malibu",
    region: "California",
    country: "USA",
    price: 4800000,
    beds: 6,
    baths: 5,
    sqft: 6100,
    year: 2022,
    featured: true,
    summary: "A cliffside residence where every principal room faces the Pacific.",
    description:
      "Pacific Glass House is an exercise in restraint: a slender steel frame, full-height sliding walls and uninterrupted ocean views. A cantilevered deck extends over the bluff, while the lower level holds a wellness suite, wine room and guest quarters.",
    features: [
      "Uninterrupted Pacific ocean views",
      "Cantilevered entertaining deck",
      "Lower-level wellness suite",
      "Temperature-controlled wine room",
      "Guest wing with private entry",
    ],
    amenities: [
      "Pool and spa",
      "Ocean-view gym",
      "Sauna",
      "Solar array",
      "EV charging",
      "Gated motor court",
    ],
    images: [
      "photo-1613490493576-7fde63acd811",
      "photo-1600607687920-4e2a09cf159d",
      "photo-1600585154526-990dced4db0d",
      "photo-1600210492493-0946911123ea",
    ],
    agentId: "olivia-carter",
  },
  {
    slug: "desert-horizon-estate",
    name: "Desert Horizon Estate",
    type: "Estate",
    city: "Scottsdale",
    region: "Arizona",
    country: "USA",
    price: 3150000,
    beds: 5,
    baths: 5,
    sqft: 5400,
    year: 2020,
    featured: true,
    summary: "Low-slung desert architecture framing the McDowell ridgeline.",
    description:
      "Desert Horizon Estate sits along a private ridge with framed views of the mountains beyond. Rammed-earth walls, deep overhangs and shaded courtyards keep the interiors cool, while a resort pool and casita make the grounds entirely self-sufficient for entertaining.",
    features: [
      "Ridge-line mountain views",
      "Shaded courtyard with water feature",
      "Detached two-room casita",
      "Rammed-earth and bronze detailing",
      "Outdoor kitchen and fire lounge",
    ],
    amenities: [
      "Resort pool",
      "Casita",
      "Fire lounge",
      "Desert garden",
      "Golf cart garage",
      "Whole-home filtration",
    ],
    images: [
      "photo-1600596542815-ffad4c1539a9",
      "photo-1600566753190-17f0baa2a6c3",
      "photo-1600607688969-a5bfcd646154",
      "photo-1600573472550-8090b5e0745e",
    ],
    agentId: "daniel-morgan",
  },
  {
    slug: "oceanfront-residence",
    name: "Oceanfront Residence",
    type: "Apartment",
    city: "Miami",
    region: "Florida",
    country: "USA",
    price: 5200000,
    beds: 4,
    baths: 4,
    sqft: 3800,
    year: 2023,
    featured: true,
    summary: "A full-floor residence with wraparound terraces over the Atlantic.",
    description:
      "Occupying an entire floor of a landmark beachfront tower, this residence offers 270-degree water views and direct beach access. Interiors are calm and material-led, with travertine floors, custom millwork and a summer kitchen on the main terrace.",
    features: [
      "Full-floor private elevator entry",
      "270-degree Atlantic views",
      "Wraparound terrace with summer kitchen",
      "Travertine and oak interiors",
      "Building spa, marina and concierge",
    ],
    amenities: [
      "Beach access",
      "Concierge",
      "Marina berth",
      "Fitness centre",
      "Valet parking",
      "Residents' spa",
    ],
    images: [
      "photo-1512917774080-9991f1c4c750",
      "photo-1613977257363-707ba9348227",
      "photo-1600585152220-90363fe7e115",
      "photo-1600121848594-d8644e57abab",
    ],
    agentId: "sophia-bennett",
  },
  {
    slug: "modern-hillside-retreat",
    name: "Modern Hillside Retreat",
    type: "House",
    city: "Los Angeles",
    region: "California",
    country: "USA",
    price: 3750000,
    beds: 4,
    baths: 4,
    sqft: 3600,
    year: 2019,
    featured: false,
    summary: "Terraced hillside living with canyon views and a pool deck.",
    description:
      "Built into a quiet canyon slope, the house steps down in three terraces, each opening to a garden or deck. An open kitchen and living volume anchors the main level, with a lower gallery level currently used as a studio and screening room.",
    features: [
      "Three terraced garden levels",
      "Canyon and city-light views",
      "Open kitchen and living volume",
      "Studio and screening room",
      "Solar-heated pool deck",
    ],
    amenities: [
      "Pool and spa",
      "Studio",
      "Screening room",
      "Outdoor shower",
      "Two-car garage",
      "Drought-tolerant garden",
    ],
    images: [
      "photo-1600047509807-ba8f99d2cdde",
      "photo-1600210491369-e753d80a41f3",
      "photo-1583608205776-bfd35f0d9f83",
      "photo-1600210492493-0946911123ea",
    ],
    agentId: "olivia-carter",
  },
  {
    slug: "palm-garden-residence",
    name: "Palm Garden Residence",
    type: "Estate",
    city: "Beverly Hills",
    region: "California",
    country: "USA",
    price: 6400000,
    beds: 6,
    baths: 7,
    sqft: 7200,
    year: 2018,
    featured: true,
    summary: "A gated 1920s estate reimagined around a mature palm garden.",
    description:
      "Behind private gates, Palm Garden Residence balances original period proportions with a fully contemporary interior. Reception rooms open to a loggia, lawn and pool, and a separate pavilion provides a gym, guest suite and staff quarters.",
    features: [
      "Gated motor court and porte-cochère",
      "Loggia, lawn and pool garden",
      "Separate gym and guest pavilion",
      "Panelled library",
      "Chef's and catering kitchens",
    ],
    amenities: [
      "Pool and spa",
      "Gym pavilion",
      "Library",
      "Wine cellar",
      "Staff quarters",
      "Generator",
    ],
    images: [
      "photo-1580587771525-78b9dba3b914",
      "photo-1600607687920-4e2a09cf159d",
      "photo-1600566753086-00f18fb6b3ea",
      "photo-1484154218962-a197022b5858",
    ],
    agentId: "daniel-morgan",
  },
  {
    slug: "contemporary-lake-house",
    name: "Contemporary Lake House",
    type: "House",
    city: "Lake Tahoe",
    region: "Nevada",
    country: "USA",
    price: 2950000,
    beds: 4,
    baths: 3,
    sqft: 3300,
    year: 2021,
    featured: false,
    summary: "Cedar, stone and glass in a year-round alpine setting.",
    description:
      "A short drive from the shoreline, Contemporary Lake House is designed for both winter and summer: heated stone terraces, a sheltered outdoor room with fireplace, and a boot room that connects directly to the garage and ski storage.",
    features: [
      "Sheltered outdoor room with fireplace",
      "Heated stone terraces",
      "Boot room and ski storage",
      "Double-height living room",
      "Private pier access nearby",
    ],
    amenities: [
      "Hot tub",
      "Ski storage",
      "Heated driveway",
      "Bonus loft",
      "Two-car garage",
      "Generator",
    ],
    images: [
      "photo-1568605114967-8130f3a36994",
      "photo-1554995207-c18c203602cb",
      "photo-1600573472550-8090b5e0745e",
      "photo-1600210492486-724fe5c67fb0",
    ],
    agentId: "james-wilson",
  },
  {
    slug: "architectural-downtown-penthouse",
    name: "Architectural Downtown Penthouse",
    type: "Penthouse",
    city: "Austin",
    region: "Texas",
    country: "USA",
    price: 1850000,
    beds: 3,
    baths: 3,
    sqft: 2450,
    year: 2022,
    featured: false,
    summary: "A corner penthouse with a planted terrace above the skyline.",
    description:
      "Perched on the top floor of a boutique downtown building, the penthouse is wrapped in steel-framed glass with a planted terrace for outdoor dining. A restrained material palette of blackened steel, walnut and stone runs throughout.",
    features: [
      "Corner glazing on two elevations",
      "Planted terrace with dining area",
      "Walnut and blackened-steel interiors",
      "Private roof deck access",
      "Two parking spaces and storage",
    ],
    amenities: [
      "Roof terrace",
      "Concierge",
      "Fitness studio",
      "Residents' lounge",
      "EV charging",
      "Secure storage",
    ],
    images: [
      "photo-1600607687939-ce8a6c25118c",
      "photo-1600210492493-0946911123ea",
      "photo-1600585154526-990dced4db0d",
      "photo-1613977257363-707ba9348227",
    ],
    agentId: "james-wilson",
  },
  {
    slug: "azure-cliff-villa",
    name: "Azure Cliff Villa",
    type: "Villa",
    city: "Laguna Beach",
    region: "California",
    country: "USA",
    price: 4250000,
    beds: 5,
    baths: 5,
    sqft: 4700,
    year: 2023,
    featured: true,
    summary: "A white-on-white villa with cascading terraces to the sea.",
    description:
      "Azure Cliff Villa descends the cliff in a series of white terraces, each with its own outlook over the water. Interiors are deliberately quiet — limewashed walls, pale oak and linen — so the coastline remains the focus.",
    features: [
      "Cascading sea-facing terraces",
      "Cliff-edge infinity pool",
      "Limewashed walls and pale oak",
      "Private stair to the cove",
      "Outdoor kitchen and dining terrace",
    ],
    amenities: [
      "Infinity pool",
      "Spa",
      "Beach stair",
      "Outdoor kitchen",
      "Solar array",
      "Gated entry",
    ],
    images: [
      "photo-1512918728675-ed5a9ecdebfd",
      "photo-1600210491369-e753d80a41f3",
      "photo-1600585152220-90363fe7e115",
      "photo-1600607688969-a5bfcd646154",
    ],
    agentId: "sophia-bennett",
  },
  {
    slug: "the-meridian-townhouse",
    name: "The Meridian Townhouse",
    type: "Townhouse",
    city: "New York",
    region: "New York",
    country: "USA",
    price: 3600000,
    beds: 4,
    baths: 4,
    sqft: 3150,
    year: 2017,
    featured: false,
    summary: "A four-storey townhouse with a garden and roof terrace.",
    description:
      "The Meridian Townhouse has been restored floor by floor: a parlour level for entertaining, a garden level with kitchen and family room, and bedrooms above. A planted roof terrace offers a quiet view over the neighbouring rooftops.",
    features: [
      "Four full floors plus basement",
      "South-facing garden",
      "Planted roof terrace",
      "Restored period façade",
      "Kitchen and family room at garden level",
    ],
    amenities: [
      "Garden",
      "Roof terrace",
      "Wine store",
      "Utility and storage basement",
      "Central air",
      "Alarm and intercom",
    ],
    images: [
      "photo-1564013799919-ab600027ffc6",
      "photo-1570129477492-45c003edd2be",
      "photo-1523217582562-09d0def993a6",
      "photo-1502672260266-1c1ef2d93688",
    ],
    agentId: "daniel-morgan",
  },
  {
    slug: "sunset-ridge-estate",
    name: "Sunset Ridge Estate",
    type: "Estate",
    city: "Paradise Valley",
    region: "Arizona",
    country: "USA",
    price: 5750000,
    beds: 6,
    baths: 6,
    sqft: 6800,
    year: 2021,
    featured: false,
    summary: "A private compound of three pavilions around a central court.",
    description:
      "Sunset Ridge Estate is arranged as three pavilions around a central court with a reflecting pool. Each pavilion has its own character — living, sleeping and recreation — and every room opens directly to the landscape.",
    features: [
      "Three-pavilion compound layout",
      "Central court with reflecting pool",
      "Recreation pavilion with gym",
      "Guest house with two suites",
      "Unobstructed sunset views",
    ],
    amenities: [
      "Reflecting pool",
      "Gym pavilion",
      "Guest house",
      "Putting green",
      "Motor court",
      "Backup power",
    ],
    images: [
      "photo-1449844908441-8829872d2607",
      "photo-1580587771525-78b9dba3b914",
      "photo-1600047509807-ba8f99d2cdde",
      "photo-1600566753190-17f0baa2a6c3",
    ],
    agentId: "daniel-morgan",
  },
  {
    slug: "marina-bay-loft",
    name: "Marina Bay Loft",
    type: "Apartment",
    city: "San Francisco",
    region: "California",
    country: "USA",
    price: 2150000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    year: 2016,
    featured: false,
    summary: "An industrial loft converted with light and harbour views.",
    description:
      "A former warehouse floor converted into a single generous loft: exposed structure, north light and wide harbour views. Bedrooms are arranged in a quieter rear volume, with a study and utility room between.",
    features: [
      "Double-height living space",
      "Exposed steel and brick structure",
      "North light and harbour views",
      "Rear bedroom volume with study",
      "Secure parking and storage",
    ],
    amenities: [
      "Harbour views",
      "Freight lift access",
      "Bike store",
      "Secure parking",
      "Roof access",
      "Pet friendly",
    ],
    images: [
      "photo-1502672260266-1c1ef2d93688",
      "photo-1484154218962-a197022b5858",
      "photo-1554995207-c18c203602cb",
      "photo-1600210491369-e753d80a41f3",
    ],
    agentId: "james-wilson",
  },
];

export const propertyTypes: PropertyType[] = [
  "Villa",
  "Estate",
  "Penthouse",
  "House",
  "Townhouse",
  "Apartment",
];

export const services = [
  {
    title: "Luxury Home Sales",
    description:
      "Discreet representation for architect-designed homes, from first viewing to final signature.",
    icon: "house" as const,
  },
  {
    title: "Property Investment",
    description:
      "Yield modelling, portfolio structuring and acquisition strategy for private and institutional buyers.",
    icon: "chart" as const,
  },
  {
    title: "Property Marketing",
    description:
      "Editorial photography, film and international campaigns built around each property's architecture.",
    icon: "camera" as const,
  },
  {
    title: "Real Estate Advisory",
    description:
      "Independent guidance on pricing, timing and negotiation across prime neighbourhoods.",
    icon: "handshake" as const,
  },
  {
    title: "Property Valuation",
    description:
      "Detailed comparative valuations and condition reports prepared by senior specialists.",
    icon: "key" as const,
  },
  {
    title: "Relocation Services",
    description:
      "Neighbourhood research, school introductions and settling-in support for international moves.",
    icon: "globe" as const,
  },
];

export const whyChooseUs = [
  {
    title: "Prime Listings",
    description:
      "A curated portfolio of architectural homes and investment assets, never bulk inventory.",
    icon: "house" as const,
  },
  {
    title: "Trusted Advisors",
    description:
      "Senior specialists who represent one side of the table and stay with you through completion.",
    icon: "handshake" as const,
  },
  {
    title: "Market Insight",
    description:
      "Live comparable data and yield analysis behind every recommendation we make.",
    icon: "chart" as const,
  },
  {
    title: "Secure Process",
    description:
      "Vetted legal, finance and inspection partners, with clear documentation at each stage.",
    icon: "shield" as const,
  },
];
