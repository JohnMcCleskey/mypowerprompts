function safeFilename(filename: string): string {
  const cleaned = filename.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "download";
}

export function textBody(body: string, contentType: string, filename?: string): Response {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=3600",
  };
  if (filename) {
    headers["Content-Disposition"] = `attachment; filename="${safeFilename(filename)}"`;
  }
  return new Response(body, { headers });
}
