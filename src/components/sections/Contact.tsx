import { useId, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { profile, socialLinks } from "../../data/site";
import {
  isRemoteSubmissionConfigured,
  submitContact,
} from "../../lib/contact";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { SocialIcons } from "../ui/SocialIcons";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { name: string; email: string; message: string }) {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  return errors;
}

export function Contact() {
  const uid = useId();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status !== "idle") setStatus("idle");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
      if (isRemoteSubmissionConfigured) {
        setValues({ name: "", email: "", message: "" });
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500 ${
      hasError
        ? "border-red-400 dark:border-red-500/60"
        : "border-slate-200 focus:border-blue-500 dark:border-white/[0.09] dark:focus:border-blue-500/70"
    }`;

  const details = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phoneHref}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ] as const;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-y border-t border-slate-200/70 dark:border-white/[0.05]"
    >
      <div className="section">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something useful."
          description="Have a project, technical question, or opportunity? Feel free to get in touch."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          <motion.div {...revealItem(0)} className="space-y-4">
            <ul className="space-y-3">
              {details.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                        {detail.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {detail.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="surface surface-hover flex items-center gap-4 p-4"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="surface flex items-center gap-4 p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="surface p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                Elsewhere
              </p>
              <SocialIcons links={socialLinks} className="mt-3 flex-wrap" />
            </div>
          </motion.div>

          <motion.form
            {...revealItem(1)}
            onSubmit={handleSubmit}
            noValidate
            className="surface space-y-5 p-6 sm:p-7"
          >
            <div>
              <label
                htmlFor={`${uid}-name`}
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Name
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(event) => update("name")(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                placeholder="Your name"
                className={fieldClass(Boolean(errors.name))}
              />
              {errors.name ? (
                <p
                  id={`${uid}-name-error`}
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                >
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`${uid}-email`}
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => update("email")(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? `${uid}-email-error` : undefined
                }
                placeholder="you@example.com"
                className={fieldClass(Boolean(errors.email))}
              />
              {errors.email ? (
                <p
                  id={`${uid}-email-error`}
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor={`${uid}-message`}
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={5}
                value={values.message}
                onChange={(event) => update("message")(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? `${uid}-message-error` : undefined
                }
                placeholder="Tell me about your project, question, or opportunity."
                className={`${fieldClass(Boolean(errors.message))} resize-y`}
              />
              {errors.message ? (
                <p
                  id={`${uid}-message-error`}
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full"
            >
              {status === "submitting" ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>

            {/* Status messages are announced to screen readers. */}
            <div aria-live="polite" role="status">
              {status === "success" ? (
                <p className="flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {isRemoteSubmissionConfigured
                    ? "Thanks — your message has been sent. I'll get back to you soon."
                    : `Your email app should now be open with the message ready. If it didn't open, email me directly at ${profile.email}.`}
                </p>
              ) : null}

              {status === "error" ? (
                <p className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  Something went wrong. Please email me directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-medium underline"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              ) : null}
            </div>

            {!isRemoteSubmissionConfigured ? (
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500">
                This form opens your own email app with the message prepared, so
                you can see exactly what is sent.
              </p>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
