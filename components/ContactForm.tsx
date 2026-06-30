"use client";

import { FormEvent, useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import {
  ContactFormData,
  ContactFormErrors,
  SubmissionStatus,
} from "@/types/contact";
import styles from "./css/Form.module.css";
import Button from "./Button";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  telegram: "",
  serviceRequired: "ERC20 Token Creation",
  message: "",
};

const SERVICE_OPTIONS = [
  "ERC20 Token Creation",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  function updateField<K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData(INITIAL_FORM);
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className={`${styles.statusBanner} ${styles.statusSuccess}`}>
          <CheckCircle2 size={18} />
          Message sent. We typically respond within one business day.
        </div>
      )}
      {status === "error" && (
        <div className={`${styles.statusBanner} ${styles.statusError}`}>
          <AlertCircle size={18} />
          Please fix the highlighted fields and try again.
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name<span className={styles.required}>*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email<span className={styles.required}>*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="telegram">
            Telegram
          </label>
          <input
            id="telegram"
            type="text"
            placeholder="@yourhandle"
            className={styles.input}
            value={formData.telegram}
            onChange={(e) => updateField("telegram", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="serviceRequired">
            Service Required
          </label>
          <select
            id="serviceRequired"
            className={styles.select}
            value={formData.serviceRequired}
            onChange={(e) => updateField("serviceRequired", e.target.value)}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.field} ${styles.fullSpan}`}>
          <label className={styles.label} htmlFor="message">
            Message<span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            placeholder="Tell us about your project..."
            className={`${styles.textarea} ${
              errors.message ? styles.inputError : ""
            }`}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
          />
          {errors.message && (
            <span className={styles.errorMessage}>{errors.message}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" icon={<Send size={16} />}>
          Send Message
        </Button>
      </div>
    </form>
  );
}
