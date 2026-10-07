import { agents, properties, type Agent, type Property, type PropertyType } from "../data/site";

export const priceBands = [
  { id: "any", label: "Any price", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under-2m", label: "Under $2M", min: 0, max: 2_000_000 },
  { id: "2m-3.5m", label: "$2M – $3.5M", min: 2_000_000, max: 3_500_000 },
  { id: "3.5m-5m", label: "$3.5M – $5M", min: 3_500_000, max: 5_000_000 },
  { id: "over-5m", label: "$5M and above", min: 5_000_000, max: Number.POSITIVE_INFINITY },
];

export type SortKey = "featured" | "price-asc" | "price-desc" | "sqft-desc" | "beds-desc";

export const sortOptions: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured first" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "sqft-desc", label: "Largest first" },
  { id: "beds-desc", label: "Most bedrooms" },
];

export type Filters = {
  query: string;
  city: string;
  type: string;
  price: string;
  beds: string;
  baths: string;
  featuredOnly: boolean;
  sort: SortKey;
};

export const emptyFilters: Filters = {
  query: "",
  city: "any",
  type: "any",
  price: "any",
  beds: "any",
  baths: "any",
  featuredOnly: false,
  sort: "featured",
};

export function locationLabel(property: Property) {
  return `${property.city}, ${property.region}, ${property.country}`;
}

export function formatPrice(value: number) {
  if (value >= 1_000_000) {
    const millions = Math.round((value / 1_000_000) * 100) / 100;
    return `$${millions} Million`;
  }
  return `$${value.toLocaleString("en-US")}`;
}

export function formatPriceFull(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatSqft(value: number) {
  return `${value.toLocaleString("en-US")} sq ft`;
}

export function getAgent(agentId: string): Agent {
  return agents.find((agent) => agent.id === agentId) ?? agents[0];
}

export function getProperty(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function getCities(): string[] {
  return [...new Set(properties.map((property) => property.city))].sort();
}

export function getTypes(): PropertyType[] {
  return [...new Set(properties.map((property) => property.type))].sort() as PropertyType[];
}

export function similarProperties(slug: string, limit = 3): Property[] {
  const current = getProperty(slug);
  if (!current) return [];
  return properties
    .filter((property) => property.slug !== slug)
    .sort((a, b) => {
      const score = (property: Property) =>
        (property.type === current.type ? 2 : 0) + (property.city === current.city ? 1 : 0);
      return score(b) - score(a) || Math.abs(a.price - current.price) - Math.abs(b.price - current.price);
    })
    .slice(0, limit);
}

export function filterProperties(filters: Filters): Property[] {
  const band = priceBands.find((item) => item.id === filters.price) ?? priceBands[0];
  const query = filters.query.trim().toLowerCase();

  const result = properties.filter((property) => {
    if (query) {
      const haystack = `${property.name} ${property.city} ${property.region} ${property.country} ${property.type}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.city !== "any" && property.city !== filters.city) return false;
    if (filters.type !== "any" && property.type !== filters.type) return false;
    if (property.price < band.min || property.price > band.max) return false;
    if (filters.beds !== "any" && property.beds < Number(filters.beds)) return false;
    if (filters.baths !== "any" && property.baths < Number(filters.baths)) return false;
    if (filters.featuredOnly && !property.featured) return false;
    return true;
  });

  return sortProperties(result, filters.sort);
}

export function sortProperties(items: Property[], sort: SortKey): Property[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "sqft-desc":
      return sorted.sort((a, b) => b.sqft - a.sqft);
    case "beds-desc":
      return sorted.sort((a, b) => b.beds - a.beds);
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}
