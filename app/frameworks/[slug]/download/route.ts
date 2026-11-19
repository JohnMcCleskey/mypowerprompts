import { getFramework, readOwnedFile } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const framework = getFramework(slug);
  const source = framework ? readOwnedFile("framework", framework.slug) : null;
  if (!framework || !source) return new Response("Not found", { status: 404 });
  return textBody(source, "text/markdown; charset=utf-8", `${framework.slug}.md`);
}
