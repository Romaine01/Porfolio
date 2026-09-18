import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "../../data/experience";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-y"
    >
      <div className="section">
        <SectionHeading eyebrow="Education" title="Education" />

        <ol className="mt-10 space-y-6">
          {education.map((entry, index) => (
            <motion.li
              key={entry.degree}
              {...revealItem(index)}
              className="surface p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <GraduationCap
                      className="h-[18px] w-[18px]"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{entry.degree}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {entry.school}
                    </p>
                  </div>
                </div>

                <span className="chip whitespace-nowrap">{entry.period}</span>
              </div>

              <div className="mt-5 sm:pl-14">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Relevant areas
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.coursework.map((course) => (
                    <li key={course} className="chip">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
