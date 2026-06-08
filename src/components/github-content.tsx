"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from 'next-intl';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  homepage?: string | null;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

export function GitHubContent({
  repos,
  user,
}: {
  repos: GitHubRepo[];
  user: GitHubUser | null;
}) {
  const t = useTranslations('Projects');
  const { ref, isInView, staggerVariants } = useScrollAnimation();

  const cardClasses = "group relative flex h-full flex-col overflow-hidden border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5";
  const titleClasses = "text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors";

  return (
    <SectionWrapper id="github" mesh="light">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label="GitHub"
          title="Código aberto"
          description="Meus repositórios mais recentes no GitHub."
        />

        {user && (
          <div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user.public_repos}
              </p>
              <p className="text-xs text-muted-foreground">Repositórios</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user.followers}
              </p>
              <p className="text-xs text-muted-foreground">Seguidores</p>
            </div>
          </div>
        )}

        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              custom={i}
              variants={staggerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Card className={cardClasses}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={titleClasses}>
                      {repo.name}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-6">
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground/90">
                    {repo.description || "Sem descrição"}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-6 border-t border-border/40 bg-muted/5 py-6">
                  <div className="flex flex-wrap gap-2">
                    {repo.topics?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-border/60 bg-background/50 font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {(!repo.topics || repo.topics.length === 0) && repo.language && (
                      <Badge
                        key={repo.language}
                        variant="outline"
                        className="border-border/60 bg-background/50 font-medium"
                      >
                        {repo.language}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-5">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <GitHubIcon className="size-4" />
                      {t('code')}
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="size-4" />
                        {t('live')}
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            <GitHubIcon className="mr-2 size-4" />
            Ver todos no GitHub
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
