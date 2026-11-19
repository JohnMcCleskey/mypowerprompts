import { getPack } from "@/lib/content";
import { textBody } from "@/lib/responses";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const pack = getPack(id);
  const lead = pack?.files.find((file) => file.name === pack.leadFile);
  if (!lead) return new Response("Not found", { status: 404 });
  return textBody(lead.content, "text/plain; charset=utf-8");
}
