"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCities, getTypes } from "../lib/properties";
import { useScrollScrub } from "../lib/useScrollScrub";
import { House, MapPin, Search } from "./Icons";
import SmartImage from "./SmartImage";
import styles from "./Hero.module.css";

const FALLBACK_IMAGE = "photo-1605276374104-dee2a0ed3cd6";
const POSTER = "/hero/hero-poster.jpg";
const DESKTOP_VIDEO = "/hero/hero-desktop.mp4";
const MOBILE_VIDEO = "/hero/hero-mobile.mp4";

type Mode = "pending" | "static" | "desktop" | "mobile";

export default function Hero() {
  const router = useRouter();
  const [city, setCity] = useState("any");
  const [type, setType] = useState("any");
  const [mode, setMode] = useState<Mode>("pending");

  // Reduced motion gets a plain static frame; everyone else gets the scrub,
  // with a lighter cut of the media on small screens.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("static");
      return;
    }
    setMode(window.matchMedia("(max-width: 860px)").matches ? "mobile" : "desktop");
  }, []);

  const reduced = mode === "static";
  const src = mode === "desktop" ? DESKTOP_VIDEO : mode === "mobile" ? MOBILE_VIDEO : null;

  const { wrapRef, videoRef, contentRef, status, buffered } = useScrollScrub({
    src,
    disabled: src === null,
  });

  const failed = status === "error";
  const showVideo = src !== null && !failed;

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
    <section
      ref={wrapRef}
      className={`${styles.hero} ${failed ? styles.heroStatic : ""}`}
      aria-labelledby="hero-title"
    >
      <div
        className={`${styles.viewport} ${status === "ready" ? styles.isReady : ""}`}
        data-status={status}
      >
        <div
          className={styles.media}
          style={failed ? undefined : { backgroundImage: `url(${POSTER})` }}
        >
          {showVideo && (
            <video
              ref={videoRef}
              className={styles.video}
              poster={POSTER}
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
            />
          )}

          {reduced && <img className={styles.image} src={POSTER} alt="" aria-hidden="true" />}

          {failed && (
            <SmartImage id={FALLBACK_IMAGE} alt="" priority className={styles.image} sizes="100vw" />
          )}
        </div>

        <span className={styles.overlay} aria-hidden="true" />

        <div className={styles.content} ref={contentRef}>
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

        {showVideo && (
          <div
            className={`${styles.loader} ${status === "ready" ? styles.loaderDone : ""}`}
            role="status"
            aria-live="polite"
          >
            <span className={styles.loaderLabel}>
              {status === "ready" ? "" : "Preparing the tour"}
            </span>
            <span className={styles.loaderTrack}>
              <span className={styles.loaderFill} style={{ transform: `scaleX(${buffered})` }} />
            </span>
          </div>
        )}

        <span className={styles.fade} aria-hidden="true" />
      </div>
    </section>
  );
}
