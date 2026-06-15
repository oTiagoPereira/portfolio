"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { projects } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from 'next-intl';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export function Projects() {
  const t = useTranslations('Projects');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { ref, isInView, staggerVariants } = useScrollAnimation();

  const filtered = useMemo(
    () =>
      activeTag
        ? projects.filter((p) => p.tags.includes(activeTag))
        : projects,
    [activeTag]
  );

  const items = t.raw('items') as Array<{
    title: string;
    description: string;
  }>;

  const gridClasses = "grid gap-8 sm:grid-cols-2 lg:grid-cols-3";
  const cardClasses = "group relative flex h-full flex-col overflow-hidden border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5";
  const titleClasses = "text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors";

  return (
    <SectionWrapper id="projects" mesh="light">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <Badge
            variant={activeTag === null ? "default" : "outline"}
            className="h-auto cursor-pointer px-5 py-2 text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
            onClick={() => setActiveTag(null)}
          >
            Todos
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="h-auto cursor-pointer px-5 py-2 text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div ref={ref} className={gridClasses}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={staggerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Card className={cardClasses}>
                {project.image && (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-border/40">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={titleClasses}>
                      {items[i]?.title || project.title}
                    </h3>
                    {project.featured && (
                      <Badge
                        variant="default"
                        className="bg-primary/10 text-primary border-primary/20 font-semibold"
                      >
                        {t('featured')}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-6">
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground/90">
                    {items[i]?.description || project.description}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-6 border-t border-border/40 bg-muted/5 py-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-border/60 bg-background/50 font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <GitHubIcon className="size-4" />
                        {t('code')}
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
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
      </div>
    </SectionWrapper>
  );
}
