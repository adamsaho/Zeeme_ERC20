import { Sparkles, Zap, ShieldCheck, Coins } from "lucide-react";
import Button from "./Button";
import styles from "./css/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className="fadeInUp">
          <span className={styles.badge}>
            <Sparkles size={14} />
            Trusted ERC20 Deployment Service
          </span>
          <h1 className={styles.headline}>
            Launch Your{" "}
            <span className="gradientText">ERC20 Token</span> in Minutes
          </h1>
          <p className={styles.subtitle}>
            Professional ERC20 Token Creation Services with secure deployment,
            ownership management, and optional verification.
          </p>
          <div className={styles.ctaRow}>
            <Button href="/token-creator" size="lg" icon={<Zap size={18} />}>
              Create Token
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>5+</span>
              <span className={styles.statLabel}>Networks Supported</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>24-48h</span>
              <span className={styles.statLabel}>Average Delivery</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>Ownership Transfer</span>
            </div>
          </div>
        </div>

        <div className={`${styles.illustration} fadeIn delay-2`}>
          <div className={`${styles.orbitRing} ${styles.ring2}`} />
          <div className={`${styles.orbitRing} ${styles.ring1}`} />
          <div className={styles.coreCard}>
            <Coins size={88} strokeWidth={1.4} className={styles.coreIcon} />
          </div>
          <div className={`${styles.floatChip} ${styles.chipPrimary}`}>
            <Zap size={14} /> Mintable
          </div>
          <div className={`${styles.floatChip} ${styles.chipAccent}`}>
            <ShieldCheck size={14} /> Verified
          </div>
          <div className={`${styles.floatChip} ${styles.chipSecondary}`}>
            <Coins size={14} /> Burnable
          </div>
        </div>
      </div>
    </section>
  );
}
