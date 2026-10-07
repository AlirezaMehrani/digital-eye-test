import { services } from "../data/site";
import { iconMap } from "./Icons";
import Reveal from "./Reveal";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className="section sectionAlt" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <span className="label">What We Do</span>
            <h2 id="services-title" className="title">
              Services
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={`lede ${styles.headCopy}`}>
              Six disciplines, one practice. Every mandate is led by a senior advisor and built
              around the architecture, location and long-term value of the property itself.
            </p>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <li key={service.title} className={styles.item}>
                <Reveal delay={index * 60}>
                  <div className={styles.itemHead}>
                    <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                    <Icon size={19} className={styles.icon} />
                  </div>
                  <h3 className={styles.itemTitle}>{service.title}</h3>
                  <p className={styles.itemText}>{service.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
