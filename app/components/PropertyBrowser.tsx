"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { properties } from "../data/site";
import {
  emptyFilters,
  filterProperties,
  getCities,
  getTypes,
  priceBands,
  sortOptions,
  type Filters,
  type SortKey,
} from "../lib/properties";
import { ChevronDown, Close, Search } from "./Icons";
import PropertyCard from "./PropertyCard";
import Reveal from "./Reveal";
import styles from "./PropertyBrowser.module.css";

const bedOptions = ["1", "2", "3", "4", "5", "6"];

export default function PropertyBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => ({
    ...emptyFilters,
    query: searchParams.get("q") ?? "",
    city: searchParams.get("city") ?? "any",
    type: searchParams.get("type") ?? "any",
  }));

  const cities = getCities();
  const types = getTypes();
  const results = useMemo(() => filterProperties(filters), [filters]);

  /* Keep the URL in step so results are shareable and Back returns to them. */
  useEffect(() => {
    const params = new URLSearchParams();
    const query = filters.query.trim();
    if (query) params.set("q", query);
    if (filters.city !== "any") params.set("city", filters.city);
    if (filters.type !== "any") params.set("type", filters.type);
    const next = params.toString();
    router.replace(next ? `/properties?${next}` : "/properties", { scroll: false });
  }, [filters.query, filters.city, filters.type, router]);

  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((previous) => ({ ...previous, [key]: value }));

  const activeCount = [
    filters.query.trim() !== "",
    filters.city !== "any",
    filters.type !== "any",
    filters.price !== "any",
    filters.beds !== "any",
    filters.baths !== "any",
    filters.featuredOnly,
  ].filter(Boolean).length;

  const reset = () => setFilters({ ...emptyFilters, sort: filters.sort });

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchField}>
          <Search size={18} />
          <label className="srOnly" htmlFor="filter-query">
            Search properties
          </label>
          <input
            id="filter-query"
            type="search"
            placeholder="Search by name, city or property type"
            value={filters.query}
            onChange={(event) => update("query", event.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className="srOnly" htmlFor="filter-city">
            Location
          </label>
          <select
            id="filter-city"
            value={filters.city}
            onChange={(event) => update("city", event.target.value)}
          >
            <option value="any">Any location</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <div className={styles.control}>
          <label className="srOnly" htmlFor="filter-type">
            Property type
          </label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(event) => update("type", event.target.value)}
          >
            <option value="any">Any type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <div className={styles.control}>
          <label className="srOnly" htmlFor="filter-price">
            Price range
          </label>
          <select
            id="filter-price"
            value={filters.price}
            onChange={(event) => update("price", event.target.value)}
          >
            {priceBands.map((band) => (
              <option key={band.id} value={band.id}>
                {band.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <div className={styles.control}>
          <label className="srOnly" htmlFor="filter-beds">
            Bedrooms
          </label>
          <select
            id="filter-beds"
            value={filters.beds}
            onChange={(event) => update("beds", event.target.value)}
          >
            <option value="any">Any beds</option>
            {bedOptions.map((count) => (
              <option key={count} value={count}>
                {count}+ beds
              </option>
            ))}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <div className={styles.control}>
          <label className="srOnly" htmlFor="filter-baths">
            Bathrooms
          </label>
          <select
            id="filter-baths"
            value={filters.baths}
            onChange={(event) => update("baths", event.target.value)}
          >
            <option value="any">Any baths</option>
            {bedOptions.map((count) => (
              <option key={count} value={count}>
                {count}+ baths
              </option>
            ))}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <div className={styles.control}>
          <label className="srOnly" htmlFor="filter-sort">
            Sort by
          </label>
          <select
            id="filter-sort"
            value={filters.sort}
            onChange={(event) => update("sort", event.target.value as SortKey)}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(event) => update("featuredOnly", event.target.checked)}
          />
          <span>Featured only</span>
        </label>
      </div>

      <div className={styles.summary}>
        <p className={styles.count} aria-live="polite">
          {results.length} {results.length === 1 ? "property" : "properties"}
          {activeCount > 0 && <span> · {activeCount} filter{activeCount === 1 ? "" : "s"} applied</span>}
        </p>
        {activeCount > 0 && (
          <button type="button" className={styles.clear} onClick={reset}>
            <Close size={15} />
            Clear all
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className={styles.grid}>
          {results.map((property, index) => (
            <li key={property.slug}>
              <Reveal delay={Math.min(index, 5) * 50}>
                <PropertyCard property={property} priority={index < 3} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>No properties match these filters</h2>
          <p className={styles.emptyText}>
            Try widening the price range or clearing the location filter — new listings are added
            to the portfolio every week.
          </p>
          <button type="button" className="btn btnDark" onClick={reset}>
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
