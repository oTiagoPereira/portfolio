"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Wrench,
  Palette,
} from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { skills, type Skill } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

const categoryConfig: Record<
  Skill["category"],
  { icon: React.ReactNode; color: string }
> = {
  frontend: {
    icon: <Code2 className="size-4" />,
    color: "border-primary/30 bg-primary/10 text-primary",
  },
  backend: {
    icon: <Database className="size-4" />,
    color: "border-accent/30 bg-accent/10 text-accent",
  },
  ferramentas: {
    icon: <Wrench className="size-4" />,
    color: "border-chart-4/30 bg-chart-4/10 text-chart-4",
  },
  design: {
    icon: <Palette className="size-4" />,
    color: "border-chart-3/30 bg-chart-3/10 text-chart-3",
  },
};

export function Stack() {
  const t = useTranslations('Stack');
  const { ref, isInView, staggerVariants } = useScrollAnimation();
  const categories = Object.keys(categoryConfig) as Skill["category"][];

  const categoryLabelClasses = "text-sm sm:text-base font-semibold uppercase tracking-wider text-muted-foreground/70";
  const categoryContainerClasses = "space-y-12";

  return (
    <SectionWrapper id="stack" mesh="dark">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        <div ref={ref} className={categoryContainerClasses}>
          {categories.map((category, catIndex) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;
            const config = categoryConfig[category];

            return (
              <motion.div
                key={category}
                custom={catIndex}
                variants={staggerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("flex size-9 sm:size-10 items-center justify-center rounded-md border border-border/50 bg-background/50 backdrop-blur-sm", config.color.split(" ")[2])}>
                    {config.icon}
                  </div>
                  <span className={categoryLabelClasses}>
                    {t(`categories.${category}`)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className="h-auto px-4 py-2 text-sm sm:text-base font-medium transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-default"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
