"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCities, getTypes } from "../lib/properties";
import { House, MapPin, Search } from "./Icons";
import SmartImage from "./SmartImage";
import styles from "./Hero.module.css";

const HERO_IMAGE = "photo-1605276374104-dee2a0ed3cd6";

export default function Hero() {
  const router = useRouter();
  const [city, setCity] = useState("any");
  const [type, setType] = useState("any");

  const cities = getCities();
  const types = getTypes();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city !== "any") params.set("city", city);
    if (type !== "any") params.set("type", type);
    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <SmartImage id={HERO_IMAGE} alt="" priority className={styles.image} sizes="100vw" />
      </div>
      <span className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.kicker}>Prime residential &amp; investment property</p>
        <h1 id="hero-title" className={styles.title}>
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </h1>
        <p className={styles.subtitle}>
          Premium properties in prime locations. Find your dream home or the perfect
          investment with confidence.
        </p>

        <form className={styles.search} onSubmit={submit} role="search" aria-label="Property search">
          <div className={styles.field}>
            <MapPin size={17} />
            <label className="srOnly" htmlFor="hero-location">
              Location
            </label>
            <select id="hero-location" name="city" value={city} onChange={(event) => setCity(event.target.value)}>
              <option value="any">Any location</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <div className={styles.field}>
            <House size={17} />
            <label className="srOnly" htmlFor="hero-type">
              Property type
            </label>
            <select id="hero-type" name="type" value={type} onChange={(event) => setType(event.target.value)}>
              <option value="any">Any property type</option>
              {types.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submit}>
            <Search size={16} />
            <span>Search</span>
          </button>
        </form>
      </div>

      <span className={styles.fade} aria-hidden="true" />
    </section>
  );
}
