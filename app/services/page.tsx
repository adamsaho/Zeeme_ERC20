import type { Metadata } from "next";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services — CryptoLaunch",
  description:
    "Explore our full range of ERC20 token creation, audit, liquidity, and verification services.",
};

export default function ServicesPage() {
  return (
    <Layout>
      <section className={`section ${styles.headerSection}`}>
        <div className="container">
          <SectionTitle
            eyebrow="Our Services"
            title="Everything you need to launch"
            subtitle="Choose from a complete suite of token launch services, all delivered by an experienced team."
          />
          <div className={styles.grid}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
