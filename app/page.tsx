import About from "./components/About";
import CtaSection from "./components/CtaSection";
import FeaturedCarousel from "./components/FeaturedCarousel";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import Services from "./components/Services";
import Team from "./components/Team";
import WhyChoose from "./components/WhyChoose";
import { properties } from "./data/site";
import { sortProperties } from "./lib/properties";
import styles from "./page.module.css";

export default function HomePage() {
  const portfolio = sortProperties(properties, "featured");
  const featuredCount = properties.filter((property) => property.featured).length;

  return (
    <>
      <Hero />

      <About />

      <section className="section sectionAlt" id="featured" aria-labelledby="featured-title">
        <div className="container">
          <Reveal className={styles.featuredHead}>
            <span className="label">Featured</span>
            <h2 id="featured-title" className={`title ${styles.featuredTitle}`}>
              Featured Properties
            </h2>
            <p className="lede">
              {featuredCount} highlighted residences from a portfolio of {properties.length}{" "}
              properties — each one visited and documented by our advisors.
            </p>
          </Reveal>

          <FeaturedCarousel properties={portfolio} />
        </div>
      </section>

      <Services />

      <WhyChoose />

      <Team />

      <CtaSection />
    </>
  );
}
