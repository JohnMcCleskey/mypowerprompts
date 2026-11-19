import { notFound } from "next/navigation";
import { getPrompt } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Power Prompts prompt";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) notFound();
  return ogImage({
    kicker: `Prompt · ${prompt.categoryLabel}`,
    title: prompt.title,
    description: prompt.description,
  });
}
