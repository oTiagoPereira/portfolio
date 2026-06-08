"use client";

import { motion } from "framer-motion";
import { Code, Network, Database, Terminal, Sparkles } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { learningTopics } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from 'next-intl';

const iconMap: Record<string, React.ReactNode> = {
  Network: <Network className="size-5" />,
  Code: <Code className="size-5" />,
  Database: <Database className="size-5" />,
  Terminal: <Terminal className="size-5" />,
};

export function Learning() {
  const t = useTranslations('Learning');
  const { ref, isInView, staggerVariants } = useScrollAnimation();
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <SectionWrapper id="learning">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        <div
          ref={ref}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2"
        >
          {learningTopics.map((topic, i) => (
            <motion.div
              key={topic.title}
              custom={i}
              variants={staggerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Card className="group border-border/60 transition-colors hover:border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {iconMap[topic.icon] || <Sparkles className="size-5" />}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {items[i]?.title || topic.title}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {items[i]?.description || topic.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
