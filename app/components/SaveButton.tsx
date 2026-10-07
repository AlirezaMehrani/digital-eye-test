"use client";

import { useFavorites } from "../lib/useFavorites";
import { Heart } from "./Icons";
import styles from "./SaveButton.module.css";

export default function SaveButton({ slug, name }: { slug: string; name: string }) {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(slug);

  return (
    <button
      type="button"
      className={`${styles.button} ${saved ? styles.active : ""}`}
      onClick={() => toggle(slug)}
      aria-pressed={saved}
    >
      <Heart size={17} filled={saved} />
      <span>{saved ? "Saved" : "Save"}</span>
      <span className="srOnly">{name}</span>
    </button>
  );
}
