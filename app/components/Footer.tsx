"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, LinkedIn, Logo, Mail, MapPin, Phone } from "./Icons";
import { PHONE_HREF, PHONE_NUMBER } from "./Header";
import styles from "./Footer.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "Horizon Properties on Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "Horizon Properties on LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedIn },
  { label: "Horizon Properties on Facebook", href: "https://www.facebook.com/", Icon: Facebook },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setStatus(valid ? "done" : "error");
    if (valid) setEmail("");
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.top}>
          <div>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandMark}>
                <Logo size={36} />
              </span>
              <span className={styles.brandText}>
                Horizon
                <em>Properties</em>
              </span>
            </Link>
            <p className={styles.description}>
              An advisory-led real estate practice representing architect-designed homes,
              private estates and prime investment property across the United States.
            </p>

            <ul className={styles.socials}>
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a className={styles.social} href={href} aria-label={label} target="_blank" rel="noreferrer">
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className={styles.colTitle}>Company</h2>
            <ul className={styles.links}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Contact</h2>
            <ul className={styles.contactList}>
              <li>
                <a className={styles.contactRow} href={PHONE_HREF}>
                  <Phone size={17} />
                  <span>{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a className={styles.contactRow} href="mailto:hello@horizonproperties.com">
                  <Mail size={17} />
                  <span>hello@horizonproperties.com</span>
                </a>
              </li>
              <li>
                <span className={styles.contactRow}>
                  <MapPin size={17} />
                  <span>
                    118 Harbour Street, Suite 900
                    <br />
                    Austin, Texas 78701
                  </span>
                </span>
              </li>
            </ul>

            <h2 className={`${styles.colTitle} ${styles.newsletterTitle}`}>Newsletter</h2>
            <p className={styles.newsletterText}>
              New listings and market notes, sent monthly.
            </p>
            <form className={styles.form} onSubmit={subscribe} noValidate>
              <label className="srOnly" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                className={styles.input}
                type="email"
                name="email"
                placeholder="you@email.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                aria-invalid={status === "error"}
                aria-describedby="newsletter-status"
              />
              <button type="submit" className={`btn btnChampagne btnSm ${styles.submit}`}>
                Subscribe
              </button>
            </form>
            <p
              id="newsletter-status"
              className={status === "error" ? styles.error : styles.status}
              role="status"
            >
              {status === "error" && "Please enter a valid email address."}
              {status === "done" && "Thanks — you're on the list."}
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</span>
          <span>Screening, valuations and viewings by appointment.</span>
        </div>
      </div>
    </footer>
  );
}
