import { notFound } from "next/navigation";
import { getPack } from "@/lib/content";
import { titleCase } from "@/lib/kinds";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Power Prompts agent pack";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pack = getPack(id);
  if (!pack) notFound();
  return ogImage({
    kicker: `Agent pack · ${titleCase(pack.type)}`,
    title: pack.title,
    description: pack.description,
  });
}
