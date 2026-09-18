import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { profile } from "../../data/site";
import { fadeUp, revealProps } from "../../lib/motion";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="section-y">
      <div className="section">
        <motion.div
          {...revealProps}
          variants={fadeUp}
          className="surface relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl" />
          </div>

          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>

          <h2 id="resume-heading" className="mt-5 text-2xl font-bold sm:text-3xl">
            Want the complete overview?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Download the full CV for a detailed record of projects, technical
            skills, experience, education, and certifications.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={profile.resumePath} download className="btn-primary">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              View CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
