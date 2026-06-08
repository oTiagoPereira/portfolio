"use client";

import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { ongoingProjects } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from 'next-intl';

export function OngoingProjects() {
  const t = useTranslations('Projects.ongoing');
  const { ref, isInView, staggerVariants } = useScrollAnimation();
  const items = t.raw('items') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <SectionWrapper id="ongoing">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t('title')}
          title={t('title')}
          description=""
        />

        <div
          ref={ref}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ongoingProjects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={staggerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Card className="relative overflow-hidden border-border/60 border-dashed transition-colors hover:border-border">
                <div className="absolute right-3 top-3">
                  <Timer className="size-4 animate-pulse text-primary" />
                </div>
                <CardHeader className="pb-3">
                  <h3 className="text-base font-semibold text-foreground">
                    {items[i]?.title || project.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {items[i]?.description || project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[0.625rem] font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
