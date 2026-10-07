import { whyChooseUs } from "../data/site";
import { iconMap } from "./Icons";
import Reveal from "./Reveal";
import styles from "./WhyChoose.module.css";

export default function WhyChoose() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="label">Why Horizon</span>
          <h2 id="why-title" className={`title ${styles.title}`}>
            Why Choose Horizon
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <li key={item.title} className={styles.item}>
                <Reveal delay={index * 80}>
                  <span className={styles.icon}>
                    <Icon size={24} />
                  </span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
