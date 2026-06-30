import type { Metadata } from "next";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact — CryptoLaunch",
  description: "Get in touch with the CryptoLaunch team about your project.",
};

export default function ContactPage() {
  return (
    <Layout>
      <section className={`section ${styles.headerSection}`}>
        <div className="container">
          <div className={styles.wrapper}>
            <SectionTitle
              eyebrow="Get In Touch"
              title="Contact our team"
              subtitle="Have a question or a custom request? Send us a message and we'll get back to you."
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
