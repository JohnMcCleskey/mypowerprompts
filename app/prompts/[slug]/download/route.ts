import { getPrompt, promptDownload } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const prompt = getPrompt(slug);
  if (!prompt) return new Response("Not found", { status: 404 });
  return textBody(promptDownload(prompt), "text/markdown; charset=utf-8", `${prompt.slug}.md`);
}
