import { notFound } from "next/navigation";
import { getUpdate } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Power Prompts what's new";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();
  return ogImage({
    kicker: update.example ? "What's new · Example" : "What's new",
    title: update.title,
    description: update.description,
  });
}
