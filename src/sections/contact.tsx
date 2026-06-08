"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Loader2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { personalInfo } from "@/data/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

import { toast } from "sonner";

export function Contact() {
  const t = useTranslations('Contact');
  const { ref, isInView, variants } = useScrollAnimation();
  const [isPending, setIsPending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const containerClasses = "mx-auto grid max-w-5xl gap-16 md:grid-cols-2";
  const contactItemClasses = "group flex items-center gap-4 text-[0.9375rem] text-muted-foreground transition-all hover:text-foreground";
  const iconBoxClasses = "flex size-11 items-center justify-center rounded-md border border-border/40 bg-primary/5 text-primary transition-all group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_rgba(255,86,0,0.1)]";
  const inputClasses = "h-12 border-border/40 bg-background/50 focus:border-primary/30 focus:ring-primary/10 transition-all";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error();

      toast.success(t('form.success'));
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error(t('form.error'));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        <div ref={ref} className={containerClasses}>
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Informações de Contato
              </h3>
              <div className="space-y-5">
                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className={contactItemClasses}
                >
                  <span className={iconBoxClasses}>
                    <Mail className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Email</span>
                    {personalInfo.social.email}
                  </div>
                </a>
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactItemClasses}
                >
                  <span className={iconBoxClasses}>
                    <GitHubIcon className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">GitHub</span>
                    /{personalInfo.social.github.split("/").pop()}
                  </div>
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactItemClasses}
                >
                  <span className={iconBoxClasses}>
                    <LinkedInIcon className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">LinkedIn</span>
                    /{personalInfo.social.linkedin.split("/").pop()}
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border border-border/40 bg-background/30 p-8 backdrop-blur-sm"
          >
            <Input
              placeholder={t('form.name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={inputClasses}
            />
            <Input
              type="email"
              placeholder={t('form.email')}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={inputClasses}
            />
            <Textarea
              placeholder={t('form.message')}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className={cn(inputClasses, "resize-none h-auto")}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-md font-bold tracking-wide shadow-lg shadow-primary/5 transition-all hover:scale-[1.01] active:scale-98"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  {t('form.sending')}
                </>
              ) : (
                <>
                  <Send className="mr-2 size-5" />
                  {t('form.send')}
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}
