import Link from "next/link";
import { Hexagon, Twitter, Send, Github } from "lucide-react";
import styles from "./css/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>
              <Hexagon size={22} className={styles.brandIcon} />
              <span>CryptoLaunch</span>
            </div>
            <p className={styles.brandText}>
              Professional ERC20 token creation and deployment services for
              builders who want to launch fast and securely.
            </p>
            <div className={styles.socials} style={{ marginTop: "1.25rem" }}>
              <a
                href="https://twitter.com"
                className={styles.socialButton}
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://t.me"
                className={styles.socialButton}
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={16} />
              </a>
              <a
                href="https://github.com"
                className={styles.socialButton}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <div className={styles.linkList}>
              <Link href="/services" className={styles.link}>
                Token Creation
              </Link>
              <Link href="/services" className={styles.link}>
                Smart Contract Audit
              </Link>
              <Link href="/services" className={styles.link}>
                Liquidity Setup
              </Link>
              <Link href="/services" className={styles.link}>
                Verification
              </Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <div className={styles.linkList}>
              <Link href="/" className={styles.link}>
                Home
              </Link>
              <Link href="/faq" className={styles.link}>
                FAQ
              </Link>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
              <Link href="/token-creator" className={styles.link}>
                Launch Token
              </Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Legal</h4>
            <div className={styles.linkList}>
              <Link href="/" className={styles.link}>
                Terms of Service
              </Link>
              <Link href="/" className={styles.link}>
                Privacy Policy
              </Link>
              <Link href="/" className={styles.link}>
                Risk Disclosure
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          © CryptoLaunch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
