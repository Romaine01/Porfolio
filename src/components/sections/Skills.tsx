import { motion } from "framer-motion";
import { Code2, Cpu, Database, LayoutGrid, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillCategories } from "../../data/skills";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  database: Database,
  cpu: Cpu,
  wrench: Wrench,
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-y border-y border-slate-200/70 bg-slate-50/50 dark:border-white/[0.05] dark:bg-white/[0.012]"
    >
      <div className="section">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="Technologies I have worked with directly across web development, backend services, databases, and connected devices."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Code2;
            return (
              <motion.li
                key={category.title}
                {...revealItem(index)}
                className="surface surface-hover p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
