import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../../data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Dialog } from "./Dialog";

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  return (
    <Dialog
      onClose={onClose}
      labelledBy={`modal-title-${project.id}`}
      closeLabel="Close project details"
    >
        <ProjectVisual project={project} />

        <div className="p-6 sm:p-7">
          <p className="eyebrow">{project.type}</p>
          <h3
            id={`modal-title-${project.id}`}
            className="mt-2 text-2xl font-bold"
          >
            {project.title}
          </h3>
          {project.context ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {project.context}
            </p>
          ) : null}

          <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
            {project.description}
          </p>

          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-500/20 dark:bg-blue-500/[0.07]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              My contribution
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.contribution}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Project highlights
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-blue-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Technology
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.github || project.demo ? (
            <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-white/[0.07]">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-secondary"
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  View Code
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-primary"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
    </Dialog>
  );
}
