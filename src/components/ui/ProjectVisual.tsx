import type { Project } from "../../data/projects";

/**
 * Abstract technical artwork per project. Deliberately not a mock screenshot —
 * no real application captures are available, so nothing here pretends to be
 * the running product.
 */
const accents: Record<Project["accent"], { from: string; to: string }> = {
  blue: { from: "#3B82F6", to: "#6366F1" },
  violet: { from: "#8B5CF6", to: "#D946EF" },
  cyan: { from: "#06B6D4", to: "#3B82F6" },
  emerald: { from: "#10B981", to: "#14B8A6" },
};

export function ProjectVisual({ project }: { project: Project }) {
  const { from, to } = accents[project.accent];
  const id = `pv-${project.id}`;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
      <svg
        viewBox="0 0 320 180"
        className="h-full w-full"
        role="img"
        aria-label={`Abstract artwork representing ${project.title}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <pattern
            id={`${id}-grid`}
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M16 0H0V16"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="320" height="180" fill="#0B1220" />
        <rect width="320" height="180" fill={`url(#${id}-grid)`} />
        <circle cx="250" cy="30" r="70" fill={`url(#${id}-g)`} opacity="0.20" />
        <circle cx="60" cy="160" r="55" fill={`url(#${id}-g)`} opacity="0.14" />

        {/* Node-and-edge motif suggesting a connected system */}
        <g stroke={from} strokeWidth="1" opacity="0.5">
          <line x1="70" y1="96" x2="140" y2="62" />
          <line x1="140" y1="62" x2="215" y2="92" />
          <line x1="140" y1="62" x2="150" y2="132" />
          <line x1="150" y1="132" x2="215" y2="92" />
        </g>
        <g fill={to}>
          <circle cx="70" cy="96" r="4.5" />
          <circle cx="140" cy="62" r="6" />
          <circle cx="215" cy="92" r="4.5" />
          <circle cx="150" cy="132" r="4" />
        </g>
      </svg>

      <span className="absolute left-4 top-4 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/85 backdrop-blur-sm">
        {project.category}
      </span>
    </div>
  );
}
