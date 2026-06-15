"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from 'next-intl';

export function Experience() {
  const t = useTranslations('Experience');
  const { ref, isInView, staggerVariants } = useScrollAnimation();

  const containerClasses = "relative mx-auto max-w-3xl";
  const timelineLineClasses = "absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-border to-border/10";
  const itemClasses = "relative pl-14";
  const dotClasses = "absolute left-5 top-0 size-[0.9375rem] -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(255,86,0,0.2)]";
  const periodClasses = "text-xs font-bold uppercase tracking-widest text-primary/80";
  const roleClasses = "text-xl font-bold tracking-tight text-foreground";

  const items = t.raw('items') as Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;

  return (
    <SectionWrapper id="experience" mesh="light">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        <div ref={ref} className={containerClasses}>
          <div className={timelineLineClasses} />

          <div className="space-y-16">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                custom={i}
                variants={staggerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={itemClasses}
              >
                <div className={dotClasses} />

                <div className="space-y-3">
                  <span className={periodClasses}>
                    {items[i]?.period || exp.period}
                  </span>
                  <div className="space-y-1">
                    <h3 className={roleClasses}>
                      {items[i]?.role || exp.role}
                    </h3>
                    <p className="text-base font-medium text-muted-foreground">
                      {items[i]?.company || exp.company}
                    </p>
                  </div>
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground/80">
                    {items[i]?.description || exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border-border/40 bg-secondary/50 font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
