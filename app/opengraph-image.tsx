import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { siteDescription } from "@/lib/site";

export const runtime = "nodejs";
export const alt = "Power Prompts";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Free public hub",
    title: "A public shelf for better prompts.",
    description: siteDescription,
  });
}
