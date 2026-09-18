import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { hero, profile, socialLinks } from "../../data/site";
import { entranceItem } from "../../lib/motion";
import { SocialIcons } from "../ui/SocialIcons";
import { CodePanel } from "../ui/CodePanel";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      {/* Restrained ambient wash — one soft gradient, not a particle field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-10rem] h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl dark:bg-blue-500/[0.10]" />
        <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-3xl dark:bg-violet-500/[0.09]" />
      </div>

      <div className="section">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-xl">
            <motion.p {...entranceItem(0)} className="eyebrow">
              {profile.eyebrow.toUpperCase()}
            </motion.p>

            <motion.h1
              id="hero-heading"
              {...entranceItem(1)}
              className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.25rem]"
            >
              {hero.heading}
            </motion.h1>

            <motion.p
              {...entranceItem(2)}
              className="mt-5 text-lg font-medium leading-snug text-slate-700 dark:text-slate-200 sm:text-xl"
            >
              {hero.subheading}
            </motion.p>

            <motion.p
              {...entranceItem(3)}
              className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400"
            >
              {hero.supporting}
            </motion.p>

            <motion.p
              {...entranceItem(4)}
              className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.location}
            </motion.p>

            <motion.div
              {...entranceItem(5)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href="#projects" className="btn-primary group">
                View Projects
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={profile.resumePath}
                download
                className="btn-secondary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
              <a
                href="#contact"
                className="btn text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div {...entranceItem(6)} className="mt-8">
              <SocialIcons links={socialLinks} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:pl-4"
          >
            <CodePanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
