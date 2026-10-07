"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Property } from "../data/site";
import { ArrowLeft, ArrowRight } from "./Icons";
import PropertyCard from "./PropertyCard";
import styles from "./FeaturedCarousel.module.css";

export default function FeaturedCarousel({ properties }: { properties: Property[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateControls = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setCanPrev(scroller.scrollLeft > 8);
    setCanNext(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener("resize", updateControls);
    return () => window.removeEventListener("resize", updateControls);
  }, [updateControls]);

  const step = useCallback((direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const slide = scroller.querySelector<HTMLElement>(`.${styles.slide}`);
    const distance = slide ? slide.offsetWidth + 24 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: distance * direction, behavior: "smooth" });
  }, []);

  /* Mouse drag on desktop; touch devices use native scrolling. */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      dragging = true;
      moved = 0;
      startX = event.clientX;
      startScroll = scroller.scrollLeft;
      scroller.dataset.dragging = "true";
      scroller.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      moved = Math.max(moved, Math.abs(delta));
      scroller.scrollLeft = startScroll - delta;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete scroller.dataset.dragging;
      if (scroller.hasPointerCapture(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }
      updateControls();
    };

    /* Swallow the click that ends a drag so cards don't navigate by accident. */
    const onClickCapture = (event: MouseEvent) => {
      if (moved > 8) {
        event.preventDefault();
        event.stopPropagation();
        moved = 0;
      }
    };

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    scroller.addEventListener("click", onClickCapture, true);

    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
      scroller.removeEventListener("click", onClickCapture, true);
    };
  }, [updateControls]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <div className={styles.carousel}>
      <div
        ref={scrollerRef}
        className={styles.viewport}
        role="region"
        aria-label="Featured properties carousel"
        tabIndex={0}
        onScroll={updateControls}
        onKeyDown={onKeyDown}
      >
        {properties.map((property, index) => (
          <div className={styles.slide} key={property.slug}>
            <PropertyCard property={property} priority={index < 2} />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/properties" className={`btn btnLight ${styles.viewAll}`}>
          View all properties
          <ArrowRight size={17} />
        </Link>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Previous properties"
          >
            <ArrowLeft size={19} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Next properties"
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
