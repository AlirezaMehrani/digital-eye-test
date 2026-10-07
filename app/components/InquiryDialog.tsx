"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Close } from "./Icons";
import styles from "./InquiryDialog.module.css";

export type InquiryMode = "contact" | "viewing";

type InquiryDialogProps = {
  open: boolean;
  mode: InquiryMode;
  propertyName: string;
  agentName: string;
  onClose: () => void;
};

const copy = {
  contact: {
    title: "Contact the agent",
    intro: "Send a message and your details straight to the listing agent.",
    submit: "Send message",
  },
  viewing: {
    title: "Schedule a viewing",
    intro: "Choose a preferred date and the agent will confirm a time with you.",
    submit: "Request viewing",
  },
} as const;

export default function InquiryDialog({
  open,
  mode,
  propertyName,
  agentName,
  onClose,
}: InquiryDialogProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; date?: string }>({});
  const [sent, setSent] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      setSent(false);
      setErrors({});
      setForm({ name: "", email: "", phone: "", date: "", message: "" });
      (restoreFocusRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const labels = copy[mode];

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (mode === "viewing" && !form.date) nextErrors.date = "Please choose a preferred date.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  };

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close dialog">
          <Close size={18} />
        </button>

        {sent ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>
              <Check size={26} />
            </span>
            <h2 id="inquiry-title" className={styles.title}>
              {mode === "viewing" ? "Viewing requested" : "Message sent"}
            </h2>
            <p className={styles.intro}>
              {mode === "viewing"
                ? `Thank you — ${agentName} will confirm your viewing of ${propertyName} by email.`
                : `Thank you — ${agentName} will reply about ${propertyName} within one business day.`}
            </p>
            <button type="button" className="btn btnDark" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="inquiry-title" className={styles.title}>
              {labels.title}
            </h2>
            <p className={styles.intro}>{labels.intro}</p>
            <p className={styles.propertyLine}>
              {propertyName} · {agentName}
            </p>

            <form className={styles.form} onSubmit={submit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="inquiry-name">Full name</label>
                  <input
                    ref={firstFieldRef}
                    id="inquiry-name"
                    name="name"
                    value={form.name}
                    onChange={update("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <span id="inquiry-name-error" className={styles.error}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="inquiry-email">Email</label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <span id="inquiry-email-error" className={styles.error}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="inquiry-phone">Phone (optional)</label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>

                {mode === "viewing" && (
                  <div className={styles.field}>
                    <label htmlFor="inquiry-date">Preferred date</label>
                    <input
                      id="inquiry-date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={update("date")}
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={errors.date ? "inquiry-date-error" : undefined}
                    />
                    {errors.date && (
                      <span id="inquiry-date-error" className={styles.error}>
                        {errors.date}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="inquiry-message">
                  {mode === "viewing" ? "Preferred time or notes" : "Message"}
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder={
                    mode === "viewing"
                      ? "Weekday mornings suit best…"
                      : "I would like to arrange a private viewing…"
                  }
                />
              </div>

              <div className={styles.actions}>
                <button type="submit" className="btn btnDark">
                  {labels.submit}
                </button>
                <button type="button" className={`btn btnLight`} onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
