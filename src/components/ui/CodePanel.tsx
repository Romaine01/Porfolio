/**
 * Hero visual: an editor-style panel rendering the same facts stated in the
 * copy. Decorative only — hidden from assistive tech since the content is
 * already available as prose above it.
 */
type Line = { indent: number; parts: [string, string][] };

// Each token carries a light-mode colour with enough contrast on white, plus
// the brighter dark-mode variant.
const K = "text-violet-600 dark:text-violet-400";
const S = "text-emerald-700 dark:text-emerald-400";
const P = "text-slate-500 dark:text-slate-500";
const N = "text-sky-700 dark:text-sky-300";

const lines: Line[] = [
  { indent: 0, parts: [["const", K], [" developer", N], [" = {", P]] },
  { indent: 1, parts: [["name:", P], [' "Yanrey Romaine Estrada"', S], [",", P]] },
  { indent: 1, parts: [["role:", P], [' "Full-Stack Developer"', S], [",", P]] },
  { indent: 1, parts: [["studies:", P], [' "BSIT, Bukidnon State University"', S], [",", P]] },
  { indent: 1, parts: [["stack: [", P]] },
  { indent: 2, parts: [['"Laravel"', S], [", ", P], ['"React"', S], [", ", P], ['"Node.js"', S], [",", P]] },
  { indent: 2, parts: [['"MySQL"', S], [", ", P], ['"MongoDB"', S], [", ", P], ['"ESP32"', S]] },
  { indent: 1, parts: [["],", P]] },
  { indent: 1, parts: [["builds:", P], [" [", P], ['"web apps"', S], [", ", P], ['"APIs"', S], [", ", P], ['"IoT systems"', S], ["],", P]] },
  { indent: 1, parts: [["available:", P], [" true", N]] },
  { indent: 0, parts: [["};", P]] },
];

export function CodePanel() {
  return (
    <div
      aria-hidden="true"
      className="relative rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.06] dark:border-white/[0.08] dark:bg-[#0B1220] dark:shadow-black/40"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-white/[0.06]">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="ml-2 font-mono text-xs text-slate-400 dark:text-slate-500">
          developer.ts
        </span>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto px-4 py-5 font-mono text-[11px] leading-6 sm:text-[12.5px] sm:leading-7">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4 whitespace-nowrap">
            <span className="w-4 shrink-0 select-none text-right text-slate-300 dark:text-slate-700">
              {i + 1}
            </span>
            <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
              {line.parts.map(([text, cls], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2.5 font-mono text-[11px] text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Open to opportunities
        </span>
        <span>TypeScript</span>
      </div>
    </div>
  );
}
