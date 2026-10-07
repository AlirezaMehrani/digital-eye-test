import { PHONE_HREF } from "./Header";
import { ArrowRight, Key } from "./Icons";
import Reveal from "./Reveal";
import styles from "./CtaSection.module.css";

export default function CtaSection() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className={styles.band}>
          <span className={styles.icon} aria-hidden="true">
            <Key size={26} />
          </span>

          <div className={styles.copy}>
            <h2 id="cta-title" className={styles.title}>
              Ready to Find Your Perfect Property?
            </h2>
            <p className={styles.text}>Let our experts guide you to the right home or investment.</p>
          </div>

          <a className={`btn btnDark ${styles.button}`} href={PHONE_HREF}>
            Get in Touch
            <ArrowRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
