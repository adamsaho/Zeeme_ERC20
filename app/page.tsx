import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Submit Request",
    description: "Fill out the token creator form with your specifications.",
  },
  {
    number: "02",
    title: "Review & Confirm",
    description: "We review your configuration and confirm pricing with you.",
  },
  {
    number: "03",
    title: "Secure Deployment",
    description: "Your contract is deployed to your chosen network.",
  },
  {
    number: "04",
    title: "Verification",
    description: "Optional source code verification on the block explorer.",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <Hero />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="What We Offer"
            title="End-to-end token launch services"
            subtitle="From smart contract creation to verification, we cover every step of bringing your token to life."
          />
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="How It Works"
            title="A simple, transparent process"
            subtitle="No technical knowledge required — just tell us what you need."
          />
          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className={styles.processCard}>
                <span className={styles.processNumber}>{step.number}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to launch your <span className="gradientText">token</span>?
              </h2>
              <p className={styles.ctaSubtitle}>
                Start your request now and have your ERC20 token live in as
                little as 1 minute.
              </p>
              <Button href="/token-creator" size="lg" icon={<ArrowRight size={18} />}>
                Create Token
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
