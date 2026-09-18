import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  image: { src: string; alt: string; width: number; height: number };
  title: string;
  onClose: () => void;
};

export function CertificateLightbox({ image, title, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Tab") {
        // Only the close button is focusable, so keep focus pinned to it.
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} certificate`}
      className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.figure
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.22 }}
        className="relative max-h-full w-auto max-w-4xl"
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="max-h-[82vh] w-auto rounded-lg bg-white shadow-2xl"
        />
        <figcaption className="mt-3 text-center text-sm text-slate-300">
          {title}
        </figcaption>
      </motion.figure>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close certificate view"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
