import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

type Props = {
  /** Accessible name, when no element in the dialog already provides one. */
  label?: string;
  /** Id of the element labelling the dialog. Use instead of `label`. */
  labelledBy?: string;
  onClose: () => void;
  children: ReactNode;
  /** Extra classes for the dialog panel. */
  className?: string;
  /** Tailwind classes for the scrim's flex alignment. */
  align?: string;
  /** Accessible name for the built-in close button. */
  closeLabel?: string;
};

/**
 * Modal dialog shell: scrim, entry/exit motion, Escape to dismiss, body scroll
 * lock, a focus trap, and focus restoration to whatever opened it. Callers
 * supply only the contents.
 */
export function Dialog({
  label = "Dialog",
  labelledBy,
  onClose,
  children,
  className = "",
  align = "items-end justify-center sm:items-center",
  closeLabel = "Close",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panelRef.current)?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[70] flex p-0 sm:p-6 ${align}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className={`relative ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {children}
      </motion.div>
    </div>
  );
}
