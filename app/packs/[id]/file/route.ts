import { getPack } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const name = new URL(request.url).searchParams.get("name");
  const pack = getPack(id);
  const file = pack && name ? pack.files.find((item) => item.name === name) : undefined;
  if (!file || !name || name !== file.name) return new Response("Not found", { status: 404 });
  const type = name.endsWith(".json") ? "application/json; charset=utf-8" : "text/markdown; charset=utf-8";
  return textBody(file.content, type, name);
}
