import { Hero } from "@/sections/hero";
import { Stack } from "@/sections/stack";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Learning } from "@/sections/learning";
import { GitHubSection } from "@/sections/github-section";
import { Contact } from "@/sections/contact";

import { setRequestLocale } from 'next-intl/server';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stack />
      <Projects />
      <Experience />
      <Learning />
      <GitHubSection />
      <Contact />
    </>
  );
}
