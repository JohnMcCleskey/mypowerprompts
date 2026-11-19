import { getFramework } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const framework = getFramework(slug);
  if (!framework?.practicePrompt) return new Response("Not found", { status: 404 });
  return textBody(framework.practicePrompt, "text/plain; charset=utf-8");
}
