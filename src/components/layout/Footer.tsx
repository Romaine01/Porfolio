import { profile, socialLinks } from "../../data/site";
import { SocialIcons } from "../ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-white/[0.06]">
      <div className="section flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Designed &amp; Developed by {profile.shortName}
          <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
          <span>© {year}</span>
        </p>

        <SocialIcons
          links={[
            ...socialLinks.filter((link) =>
              ["GitHub", "LinkedIn"].includes(link.name)
            ),
            {
              name: "Email",
              href: `mailto:${profile.email}`,
              icon: "mail" as const,
            },
          ]}
        />
      </div>
    </footer>
  );
}
