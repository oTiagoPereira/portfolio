"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  mesh?: "light" | "dark" | "none";
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function SectionWrapper({
  children,
  id,
  className = "",
  mesh = "none",
  ...props
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const sectionClasses = cn(
    "relative overflow-hidden py-32 md:py-48",
    mesh === "light" && "mesh-light",
    mesh === "dark" && "mesh-dark",
    className
  );

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={sectionClasses}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center md:mb-24">
      {label && (
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">
          {label}
        </span>
      )}
      <h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground/90 md:text-lg lg:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
