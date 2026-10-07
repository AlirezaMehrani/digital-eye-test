"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "./Icons";
import SmartImage, { unsplash } from "./SmartImage";
import styles from "./Gallery.module.css";

type GalleryProps = {
  images: string[];
  name: string;
};

export default function Gallery({ images, name }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [expanded, go]);

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <button
          type="button"
          className={styles.stageButton}
          onClick={() => setExpanded(true)}
          aria-label={`Open full-screen gallery of ${name}`}
        >
          <SmartImage
            key={images[index]}
            id={images[index]}
            alt={`${name} — photograph ${index + 1} of ${images.length}`}
            priority={index === 0}
            sizes="(max-width: 900px) 100vw, 70vw"
            className={styles.stageImage}
          />
        </button>

        <span className={styles.counter}>
          {index + 1} / {images.length}
        </span>

        <div className={styles.arrows}>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photograph">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photograph">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <ul className={styles.thumbs}>
        {images.map((id, thumbIndex) => (
          <li key={`${id}-${thumbIndex}`}>
            <button
              type="button"
              className={`${styles.thumb} ${thumbIndex === index ? styles.thumbActive : ""}`}
              onClick={() => setIndex(thumbIndex)}
              aria-label={`Show photograph ${thumbIndex + 1} of ${images.length}`}
              aria-current={thumbIndex === index}
            >
              <SmartImage id={id} alt="" sizes="160px" className={styles.thumbImage} />
            </button>
          </li>
        ))}
      </ul>

      {expanded && (
        <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={`${name} — full-screen gallery`}>
          <button
            ref={closeRef}
            type="button"
            className={styles.viewerClose}
            onClick={() => setExpanded(false)}
            aria-label="Close full-screen gallery"
          >
            <Close size={22} />
          </button>

          <img
            key={images[index]}
            className={styles.viewerImage}
            src={unsplash(images[index], 2000, 78)}
            alt={`${name} — photograph ${index + 1} of ${images.length}`}
          />

          <div className={styles.viewerBar}>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photograph">
              <ArrowLeft size={20} />
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next photograph">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
