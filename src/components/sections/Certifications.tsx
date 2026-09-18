import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BookOpen, Expand } from "lucide-react";
import { certifications } from "../../data/experience";
import type { Certification } from "../../data/experience";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { CertificateLightbox } from "../ui/CertificateLightbox";

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="section-y border-y border-slate-200/70 bg-slate-50/50 dark:border-white/[0.05] dark:bg-white/[0.012]"
    >
      <div className="section">
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications & Training"
          description="Verified credentials and completed technical training."
        />

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {certifications.map((item, index) => {
            const isCertification = item.kind === "certification";
            const Icon = isCertification ? Award : BookOpen;

            return (
              <motion.li
                key={item.title}
                {...revealItem(index)}
                className="surface surface-hover flex flex-col overflow-hidden"
              >
                {item.image ? (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    aria-label={`View the ${item.title} certificate full size`}
                    className="group relative block w-full overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-white/[0.07] dark:bg-slate-900"
                  >
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-slate-950/0 transition-colors group-hover:bg-slate-950/25" />
                    <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-slate-950/70 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                      View certificate
                    </span>
                  </button>
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        isCertification
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="chip whitespace-nowrap">
                      {isCertification ? "Certification" : "Training"}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                    {item.issuer}
                  </p>
                  {item.detail ? (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                      {item.detail}
                    </p>
                  ) : null}

                  <dl className="mt-5 space-y-1.5 border-t border-slate-200 pt-4 text-sm dark:border-white/[0.07]">
                    {item.meta.map((meta) => (
                      <div key={meta.label} className="flex justify-between gap-4">
                        <dt className="text-slate-500 dark:text-slate-500">
                          {meta.label}
                        </dt>
                        <dd className="text-right font-medium text-slate-700 dark:text-slate-300">
                          {meta.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {active?.image ? (
          <CertificateLightbox
            image={active.image}
            title={active.title}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
