"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./logo-slider.module.css";

export interface LogoSliderProps {
  logos: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export const LogoSlider = ({
  logos,
  speed = 40,
  direction = "left",
  className,
}: LogoSliderProps) => {
  // Triplicate to ensure smooth infinite loop even on ultra-wide screens
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <div
      className={cn(styles.sliderContainer, className)}
      style={{ "--speed": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          styles.sliderTrack,
          direction === "right" && styles.slideRight
        )}
      >
        {displayLogos.map((logo, index) => (
          <div
            key={index}
            className="flex h-20 w-[120px] shrink-0 items-center justify-center sm:w-[140px] lg:w-[160px]"
          >
            <div className="flex h-full w-full items-center justify-center [&>svg]:h-[65%] [&>svg]:w-auto [&>svg]:fill-zinc-800 dark:[&>svg]:fill-zinc-200 [&>img]:h-[65%] [&>img]:w-auto [&>img]:object-contain [&>img]:grayscale [&>img]:brightness-50 dark:[&>img]:brightness-125">
              {logo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

LogoSlider.displayName = "LogoSlider";
export default LogoSlider;
