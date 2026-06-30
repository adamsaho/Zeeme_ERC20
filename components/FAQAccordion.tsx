"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/types/faq";
import styles from "./css/FAQAccordion.module.css";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
          >
            <button
              className={styles.question}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
              />
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className={`${styles.answerWrapper} ${
                isOpen ? styles.answerWrapperOpen : ""
              }`}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
