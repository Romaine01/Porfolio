import { profile } from "../data/site";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Where the contact form sends its data.
 *
 * No email/backend service is configured yet, so `ENDPOINT` is null and the
 * form falls back to opening the visitor's own mail client with the message
 * prefilled. Nothing is silently swallowed and no "message sent" state is
 * shown for a delivery that did not happen.
 *
 * To enable real submissions later, set `ENDPOINT` to a URL that accepts a
 * JSON POST (for example a Formspree/Web3Forms form ID, a Vercel serverless
 * function, or any mail API). No other code needs to change.
 */
const ENDPOINT: string | null = null;

export const isRemoteSubmissionConfigured = ENDPOINT !== null;

export function buildMailtoUrl({ name, email, message }: ContactPayload) {
  const subject = `Portfolio enquiry from ${name}`;
  const body = `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  if (!ENDPOINT) {
    // Hand the message to the visitor's mail client. Caller shows the
    // "opened your email app" state rather than claiming a send.
    window.location.href = buildMailtoUrl(payload);
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`);
  }
}
