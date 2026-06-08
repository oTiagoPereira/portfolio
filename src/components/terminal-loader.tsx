"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { useTranslations } from "next-intl";

export function TerminalLoader() {
  const t = useTranslations("TerminalLoader");
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [phase, setPhase] = useState<"logo" | "welcome" | "exit">("logo");

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
    } else {
      document.body.style.overflow = "hidden";

      const timer1 = setTimeout(() => setPhase("welcome"), 2000);
      const timer2 = setTimeout(() => {
        setPhase("exit");
        setIsExiting(true);
        const exitTimer = setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("hasVisited", "true");
        }, 800);
        return () => clearTimeout(exitTimer);
      }, 4500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        document.body.style.overflow = "";
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="terminal-loader"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        backgroundColor: 'var(--background)'
      }}
      className={`flex flex-col items-center justify-center p-4 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 1 }}
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px]"
          />

          <div className="relative flex flex-col items-center gap-12">
            <div className="flex gap-8">
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="p-4 rounded-2xl bg-card border border-border shadow-xl">
                  <GitHubIcon className="size-12 text-foreground" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="p-4 rounded-2xl bg-primary shadow-xl shadow-primary/20">
                  <LinkedInIcon className="size-12 text-primary-foreground" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="p-4 rounded-2xl bg-card border border-border shadow-xl">
                  <Mail size={48} className="text-foreground" />
                </div>
              </motion.div>
            </div>

            {/* Welcome Text */}
            <div className="flex flex-col items-center text-center">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={phase !== "logo" ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-6xl font-bold tracking-tighter"
                >
                  {t("dev").split(" ").map((word, i) => (
                    <span key={i} className={i === 1 ? "text-primary" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={phase !== "logo" ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-4 flex flex-col items-center gap-6"
              >
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {t("welcome")}
                </p>

                {/* Loading Bar */}
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={phase !== "logo" ? { x: "100%" } : { x: "-100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full bg-primary"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-12 flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground uppercase"
          >
            <span>Loading Experience</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ...
            </motion.span>
          </motion.div>
    </div>
  );
}
