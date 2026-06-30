export interface ContactFormData {
  name: string;
  email: string;
  telegram: string;
  serviceRequired: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export type SubmissionStatus = "idle" | "success" | "error";
