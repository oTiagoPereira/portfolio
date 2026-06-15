"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiFigma, SiExpress } from "react-icons/si";
import { LogoSlider } from "@/components/logo-slider";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Typewriter } from "@/components/typewriter";
import { personalInfo } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const logos = [
  <SiReact key="react" />,
  <SiTypescript key="typescript" />,
  <SiNextdotjs key="nextjs" />,
  <SiNodedotjs key="nodejs" />,
  <SiJavascript key="javascript" />,
  <SiTailwindcss key="tailwind" />,
  <SiFigma key="figma" />,
  <SiExpress key="express" />
];

export function Hero() {
  const t = useTranslations('Hero');

  const [isFirstVisit] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasVisited");
    }
    return false;
  });

  const baseDelay = isFirstVisit ? 4.6 : 0.1;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: baseDelay,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, type: "spring", bounce: 0.3, delay: baseDelay + 0.3 } 
    },
  };

  const containerClasses = "relative z-10 mx-auto grid max-w-6xl items-stretch gap-12 px-6 py-20 lg:grid-cols-2 lg:py-32";
  const textContainerClasses = "flex flex-col items-start text-left order-2 lg:order-1";
  const imageContainerClasses = "flex order-1 lg:order-2";
  const titleClasses = "text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl";
  const roleClasses = "mt-6 text-xl font-medium text-muted-foreground md:text-2xl";
  const descriptionClasses = "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground/80 md:text-lg";
  const actionsClasses = "mt-12 flex flex-wrap items-center gap-4";

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col overflow-hidden"
    >
      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

        <div className={containerClasses}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={textContainerClasses}
          >
            <motion.h1
              variants={itemVariants}
              className={titleClasses}
            >
              {personalInfo.name.split(" ")[0]}{" "}
              <span className="text-primary">{personalInfo.name.split(" ")[1]}</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className={roleClasses}
            >
              <Typewriter 
                phrases={t.raw('roles')} 
                className="text-primary font-bold"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={descriptionClasses}
            >
              {t('description')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className={actionsClasses}
            >
              <a
                href="#projects"
                className={cn(buttonVariants({ size: "lg" }), "rounded-md px-8 shadow-lg shadow-primary/10 transition-all hover:scale-[1.01] active:scale-95")}
              >
                {t('viewProjects')}
                <ArrowDown className="ml-2 size-4" />
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-md px-8 transition-all hover:bg-muted/80")}
              >
                {t('downloadCV')}
                <Download className="ml-2 size-4" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 flex items-center gap-6"
            >
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-11 items-center justify-center rounded-md border border-border bg-background/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary hover:shadow-md"
                aria-label="GitHub"
              >
                <GitHubIcon className="size-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-11 items-center justify-center rounded-md border border-border bg-background/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary hover:shadow-md"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="size-5 transition-transform group-hover:scale-110" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="show"
            className={imageContainerClasses}
          >
            <div className="relative h-full w-full min-h-[400px] overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl transition-transform hover:scale-[1.01]">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
                unoptimized
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-background/40 backdrop-blur-md">
        <LogoSlider logos={logos} speed={30} direction="left" />
      </div>
    </section>
  );
}
