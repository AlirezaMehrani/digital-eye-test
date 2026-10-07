import Link from "next/link";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <span className="label">About Us</span>
          <h2 id="about-title" className={`title ${styles.title}`}>
            Who We Are
          </h2>
          <p className={styles.body}>
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>
          <p className={styles.body}>
            Our advisors work across prime city neighbourhoods, coastal communities and private
            estates — representing buyers, sellers and investors with the same measured,
            research-led approach.
          </p>
          <Link href="/#services" className={`btn btnDark ${styles.cta}`}>
            Learn More
            <ArrowRight size={17} />
          </Link>
        </Reveal>

        <Reveal delay={120} className={styles.media}>
          <div className={`${styles.shot} ${styles.shotMain}`}>
            <SmartImage
              id="photo-1600607687920-4e2a09cf159d"
              alt="Modern villa with a lit swimming pool at dusk"
              sizes="(max-width: 900px) 90vw, 34vw"
            />
          </div>
          <div className={`${styles.shot} ${styles.shotTall}`}>
            <SmartImage
              id="photo-1600585152220-90363fe7e115"
              alt="Detail of a contemporary facade with full-height glazing"
              sizes="(max-width: 900px) 45vw, 20vw"
            />
          </div>

          <Link href="/properties" className={styles.arrow} aria-label="Browse all properties">
            <ArrowRight size={20} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
