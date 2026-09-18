import { motion } from "framer-motion";
import { about, profile } from "../../data/site";
import { revealItem } from "../../lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y">
      <div className="section">
        {/* The heading sits inside the left column so the portrait column can
            start at the same vertical level as the "About" eyebrow. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <SectionHeading eyebrow="About" title="About Me" />

            <div className="mt-10 space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph.slice(0, 32)}
                  {...revealItem(index)}
                  className="text-base leading-relaxed text-slate-600 dark:text-slate-400"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* `-mt-8` cancels the card's own `pt-8`, putting the top of the
              visible portrait level with the eyebrow rather than the card's
              border. Stacked layouts keep normal flow. */}
          <motion.div
            {...revealItem(1)}
            className="surface relative flex items-end justify-center overflow-hidden px-6 pt-8 lg:-mt-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl dark:bg-blue-500/[0.10]" />
            </div>

            <img
              src={profile.photo}
              alt={profile.photoAlt}
              width={336}
              height={461}
              // Below the fold, so it yields priority to the hero.
              loading="lazy"
              decoding="async"
              className="relative h-auto w-[200px] sm:w-[240px] lg:w-[290px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
