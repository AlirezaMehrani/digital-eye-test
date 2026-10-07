import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AgentPanel from "../../components/AgentPanel";
import Gallery from "../../components/Gallery";
import { Bath, Bed, Check, House, Key, MapPin, Ruler } from "../../components/Icons";
import PropertyCard from "../../components/PropertyCard";
import Reveal from "../../components/Reveal";
import SaveButton from "../../components/SaveButton";
import { properties } from "../../data/site";
import {
  formatPrice,
  formatPriceFull,
  formatSqft,
  getAgent,
  getProperty,
  locationLabel,
  similarProperties,
} from "../../lib/properties";
import styles from "./page.module.css";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = getProperty(params.slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.name,
    description: property.summary,
  };
}

export default function PropertyDetailPage({ params }: PageProps) {
  const property = getProperty(params.slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const similar = similarProperties(property.slug);

  const facts = [
    { label: "Property type", value: property.type, Icon: House },
    { label: "Bedrooms", value: `${property.beds}`, Icon: Bed },
    { label: "Bathrooms", value: `${property.baths}`, Icon: Bath },
    { label: "Interior", value: formatSqft(property.sqft), Icon: Ruler },
    { label: "Year built", value: `${property.year}`, Icon: Key },
  ];

  return (
    <article className={styles.page}>
      <section className={styles.intro}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/properties">Properties</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{property.name}</span>
          </nav>

          <div className={styles.titleRow}>
            <div>
              <span className="label">{property.type}</span>
              <h1 className={styles.title}>{property.name}</h1>
              <p className={styles.location}>
                <MapPin size={16} />
                <span>{locationLabel(property)}</span>
              </p>
            </div>

            <div className={styles.priceBlock}>
              <p className={styles.price}>{formatPrice(property.price)}</p>
              <p className={styles.priceMeta}>{formatPriceFull(property.price)}</p>
              <SaveButton slug={property.slug} name={property.name} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <Gallery images={property.images} name={property.name} />
        </div>
      </section>

      <section className={styles.body}>
        <div className="container">
          <div className={styles.layout}>
            <div>
              <ul className={styles.facts}>
                {facts.map(({ label, value, Icon }) => (
                  <li key={label}>
                    <span className={styles.factLabel}>{label}</span>
                    <span className={styles.factValue}>
                      <Icon size={16} />
                      {value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>About this property</h2>
                <p className={styles.paragraph}>{property.description}</p>
                <p className={styles.paragraph}>{property.summary}</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Key features</h2>
                <ul className={styles.features}>
                  {property.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Amenities</h2>
                <ul className={styles.amenities}>
                  {property.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>

            <AgentPanel agent={agent} property={property} />
          </div>

          {similar.length > 0 && (
            <section className={styles.similar} aria-labelledby="similar-title">
              <Reveal>
                <span className="label">More like this</span>
                <h2 id="similar-title" className={`title ${styles.similarTitle}`}>
                  Similar Properties
                </h2>
              </Reveal>

              <ul className={styles.similarGrid}>
                {similar.map((item, index) => (
                  <li key={item.slug}>
                    <Reveal delay={index * 70}>
                      <PropertyCard property={item} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>
    </article>
  );
}
