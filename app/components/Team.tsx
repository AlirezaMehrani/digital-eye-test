import { agents } from "../data/site";
import { Mail, Phone } from "./Icons";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className="section sectionAlt" id="team" aria-labelledby="team-title">
      <div className="container">
        <Reveal className={styles.head}>
          <span className="label">Our Team</span>
          <h2 id="team-title" className={`title ${styles.title}`}>
            Meet the Team
          </h2>
          <p className={`lede ${styles.lede}`}>
            A small, senior team. You work with the advisor who knows the property — from first
            conversation to keys in hand.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {agents.map((agent, index) => (
            <li key={agent.id} className={styles.card}>
              <Reveal delay={index * 70}>
                <div className={styles.media}>
                  <SmartImage
                    id={agent.photo}
                    alt={`Portrait of ${agent.name}, ${agent.role}`}
                    sizes="(max-width: 620px) 82vw, (max-width: 1024px) 44vw, 24vw"
                    className={styles.image}
                  />
                  <div className={styles.contacts}>
                    <a href={`mailto:${agent.email}`} aria-label={`Email ${agent.name}`}>
                      <Mail size={17} />
                    </a>
                    <a href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`} aria-label={`Call ${agent.name}`}>
                      <Phone size={17} />
                    </a>
                  </div>
                </div>
                <h3 className={styles.name}>{agent.name}</h3>
                <p className={styles.role}>{agent.role}</p>
                <p className={styles.focus}>{agent.focus}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
