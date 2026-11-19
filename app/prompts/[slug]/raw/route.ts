import { getPrompt } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const prompt = getPrompt(slug);
  if (!prompt) return new Response("Not found", { status: 404 });
  return textBody(prompt.body, "text/plain; charset=utf-8");
}
