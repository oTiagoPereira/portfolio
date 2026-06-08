import { Mail, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { personalInfo } from "@/data/portfolio";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  const iconLinkClasses = "flex size-11 items-center justify-center rounded-md border border-border/40 bg-background/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/5";

  return (
    <footer className="relative border-t border-border/40 bg-background/50 py-16 backdrop-blur-sm">
      <a
        href="#hero"
        className="absolute -top-5 left-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-md border border-border/40 bg-background text-muted-foreground shadow-sm transition-all hover:-translate-y-1 hover:text-primary hover:border-primary/30"
        aria-label={t('backToTop')}
      >
        <ArrowUp className="size-5" />
      </a>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-xl font-bold tracking-tighter">
            {personalInfo.name.split(" ")[0]}
            <span className="text-primary">.</span>
          </span>
          <p className="text-sm font-medium text-muted-foreground/80">
            {personalInfo.role} &copy; {year}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLinkClasses}
            aria-label="GitHub"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLinkClasses}
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="size-5" />
          </a>
          <a
            href={`mailto:${personalInfo.social.email}`}
            className={iconLinkClasses}
            aria-label="Email"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
