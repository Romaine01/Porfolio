import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons";
import { projectCategories, projects } from "../../data/projects";
import type { Project } from "../../data/projects";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectVisual } from "../ui/ProjectVisual";
import { ProjectModal } from "../ui/ProjectModal";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter]
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-y"
    >
      <div className="section">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Projects"
          description="Systems I have built or contributed to, spanning web platforms, backend services, and IoT integration."
        />

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {projectCategories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/[0.08] dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.li
                key={project.id}
                layout
                {...revealItem(index)}
                exit={{ opacity: 0, scale: 0.97 }}
                className="group surface surface-hover overflow-hidden"
              >
                <ProjectVisual project={project} />

                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {project.type}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                  {project.context ? (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                      {project.context}
                    </p>
                  ) : null}

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Contribution:{" "}
                    </span>
                    {project.contribution}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                    {project.techStack.length > 5 ? (
                      <li className="chip">
                        +{project.techStack.length - 5}
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-5 dark:border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400"
                    >
                      Project details
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>

                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        <GithubIcon className="h-4 w-4" aria-hidden="true" />
                        Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <AnimatePresence>
        {selected ? (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
