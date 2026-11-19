import { notFound } from "next/navigation";
import { getDailyPrompt } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Power Prompts daily prompt";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const daily = getDailyPrompt(slug);
  if (!daily) notFound();
  const kicker = daily.category ? `Daily prompt · ${daily.category}` : "Daily prompt";
  return ogImage({ kicker, title: daily.title, description: daily.whatItDoes });
}
