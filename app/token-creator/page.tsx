import type { Metadata } from "next";
import { Info } from "lucide-react";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TokenForm from "@/components/TokenForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ERC20 Token Creator — CryptoLaunch",
  description:
    "Submit your ERC20 token specifications and our team will handle the rest.",
};

export default function TokenCreatorPage() {
  return (
    <Layout>
      <section className={`section ${styles.headerSection}`}>
        <div className="container">
          <div className={styles.wrapper}>
            <SectionTitle
              eyebrow="Token Creator"
              title="Create your ERC20 token"
              subtitle="Tell us how you want your token configured. This form only collects your request — no wallet connection required."
            />
            <TokenForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
