"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Logo, Menu, Phone } from "./Icons";
import styles from "./Header.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export const PHONE_NUMBER = "(555) 246-7890";
export const PHONE_HREF = "tel:+15552467890";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`${styles.header} ${overlay ? styles.overlay : styles.solid}`}
        data-scrolled={scrolled}
      >
        {overlay && <span className={styles.scrim} aria-hidden="true" />}

        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="Horizon Properties — home">
            <span className={styles.brandMark}>
              <Logo size={32} />
            </span>
            <span className={styles.brandText}>
              Horizon
              <em>Properties</em>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className={styles.phone} href={PHONE_HREF}>
              <Phone size={16} />
              <span>{PHONE_NUMBER}</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className={styles.backdrop} onClick={closeMenu} aria-hidden="true" />
          <div
            id="mobile-navigation"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className={styles.drawerHead}>
              <span className={styles.brandText}>
                Horizon
                <em>Properties</em>
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.drawerClose}
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <Close size={20} />
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.drawerLink} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <a className={styles.drawerPhone} href={PHONE_HREF} onClick={closeMenu}>
              <Phone size={16} />
              <span>{PHONE_NUMBER}</span>
            </a>
          </div>
        </>
      )}
    </>
  );
}
