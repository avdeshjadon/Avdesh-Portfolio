/* Portfolio by Avdesh Jadon — Full Stack Developer & Software Tester. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/content/projects";
import CaseView from "@/components/case/CaseView";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study · Avdesh`,
    description: project.oneLiner,
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  if (!PROJECTS.some((p) => p.slug === slug)) notFound();

  return <CaseView slug={slug} />;
}
