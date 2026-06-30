import type { Metadata } from "next";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";
import { faqs } from "@/data/faq";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FAQ — CryptoLaunch",
  description: "Answers to common questions about our ERC20 token services.",
};

export default function FAQPage() {
  return (
    <Layout>
      <section className={`section ${styles.headerSection}`}>
        <div className="container">
          <SectionTitle
            eyebrow="Support"
            title="Frequently asked questions"
            subtitle="Can't find what you're looking for? Reach out on our contact page."
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </Layout>
  );
}
