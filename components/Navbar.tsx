"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon, Menu, X } from "lucide-react";
import Button from "./Button";
import styles from "./css/Navbar.module.css";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/logo.jpg"
            alt="CryptoLaunch Logo"
            width={36}
            height={36}
            className={styles.logoImage}
            priority
          />
          <span>CryptoLaunch</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.navLinkActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.rightSide}>
          <div className={styles.desktopCta}>
            <Button href="/token-creator" size="sm">
              Launch Token
            </Button>
          </div>
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/token-creator" fullWidth onClick={closeMenu}>
            Launch Token
          </Button>
        </div>
      </div>
    </header>
  );
}
