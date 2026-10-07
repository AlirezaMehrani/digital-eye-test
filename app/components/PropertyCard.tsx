"use client";

import Link from "next/link";
import type { Property } from "../data/site";
import { formatPrice, locationLabel } from "../lib/properties";
import { useFavorites } from "../lib/useFavorites";
import { Bath, Bed, Heart, MapPin, Ruler } from "./Icons";
import SmartImage from "./SmartImage";
import styles from "./PropertyCard.module.css";

type PropertyCardProps = {
  property: Property;
  sizes?: string;
  priority?: boolean;
};

export default function PropertyCard({
  property,
  sizes = "(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw",
  priority = false,
}: PropertyCardProps) {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(property.slug);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <SmartImage
          id={property.images[0]}
          alt={`${property.name}, ${locationLabel(property)}`}
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
        <span className={styles.type}>{property.type}</span>
        <button
          type="button"
          className={`${styles.save} ${saved ? styles.saveActive : ""}`}
          onClick={() => toggle(property.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.name} from saved properties` : `Save ${property.name}`}
        >
          <Heart size={17} filled={saved} />
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{property.name}</h3>
        <p className={styles.location}>
          <MapPin size={15} />
          <span>{locationLabel(property)}</span>
        </p>
        <p className={styles.price}>{formatPrice(property.price)}</p>
      </div>

      <ul className={styles.stats}>
        <li>
          <Bed size={16} />
          <span>{property.beds} Beds</span>
        </li>
        <li>
          <Bath size={16} />
          <span>{property.baths} Baths</span>
        </li>
        <li>
          <Ruler size={16} />
          <span>{property.sqft.toLocaleString("en-US")} Sq Ft</span>
        </li>
      </ul>

      <Link href={`/properties/${property.slug}`} className={styles.stretched}>
        <span className="srOnly">View {property.name}</span>
      </Link>
    </article>
  );
}
