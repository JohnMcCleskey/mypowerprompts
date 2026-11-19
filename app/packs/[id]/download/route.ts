import { getPack } from "@/lib/content";
import { zipStore } from "@/lib/zip";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const pack = getPack(id);
  if (!pack) return new Response("Not found", { status: 404 });
  const zip = zipStore(
    pack.files.map((file) => ({
      name: `${pack.id}/${file.name}`,
      data: Buffer.from(file.content, "utf8"),
    })),
  );
  return new Response(new Uint8Array(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${pack.id}.zip"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
