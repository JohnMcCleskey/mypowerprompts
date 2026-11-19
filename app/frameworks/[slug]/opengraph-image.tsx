import { notFound } from "next/navigation";
import { getFramework } from "@/lib/content";
import { titleCase } from "@/lib/kinds";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Power Prompts framework";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const framework = getFramework(slug);
  if (!framework) notFound();
  return ogImage({
    kicker: `Framework · ${titleCase(framework.difficulty)}`,
    title: framework.title,
    description: framework.description,
  });
}
