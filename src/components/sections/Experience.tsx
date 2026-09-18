import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "../../data/experience";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-y border-y border-slate-200/70 bg-slate-50/50 dark:border-white/[0.05] dark:bg-white/[0.012]"
    >
      <div className="section">
        <SectionHeading eyebrow="Experience" title="Experience" />

        <ol className="mt-10 space-y-6">
          {experience.map((role, index) => (
            <motion.li
              key={role.role}
              {...revealItem(index)}
              className="surface relative p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Briefcase className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{role.role}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {role.organization}
                    </p>
                  </div>
                </div>

                <span className="chip whitespace-nowrap">{role.period}</span>
              </div>

              <ul className="mt-5 space-y-2.5 sm:pl-14">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-blue-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
