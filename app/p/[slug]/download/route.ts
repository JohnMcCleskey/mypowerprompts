import { dailyDownload, getDailyPrompt } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const daily = getDailyPrompt(slug);
  if (!daily) return new Response("Not found", { status: 404 });
  return textBody(dailyDownload(daily), "text/markdown; charset=utf-8", `${daily.slug}.md`);
}
