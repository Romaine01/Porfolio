import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./BrandIcons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const socialIconMap: Record<string, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  mail: Mail as unknown as IconComponent,
};

type Props = {
  links: readonly { name: string; href: string; icon: string }[];
  className?: string;
};

export function SocialIcons({ links, className = "" }: Props) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = socialIconMap[link.icon] ?? socialIconMap.mail;
        const isMail = link.href.startsWith("mailto:");

        return (
          <li key={link.name}>
            <a
              href={link.href}
              {...(isMail
                ? {}
                : { target: "_blank", rel: "noreferrer noopener" })}
              aria-label={
                isMail ? `Email ${link.name}` : `${link.name} profile`
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-white/[0.08] dark:text-slate-400 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
