import { parse } from "yaml";
import type { DailyPrompt } from "@/lib/types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function requiredString(value: unknown, key: string, file: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`Missing ${key} in ${file}`);
  return value.trim();
}

function tagsFrom(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((tag) => (typeof tag === "string" ? tag.trim() : "")).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

export function splitSource(source: string): { title: string; url: string | null } {
  const match = /https?:\/\/\S+/.exec(source);
  if (!match) return { title: source.trim(), url: null };
  const url = match[0].replace(/[),.;]+$/, "");
  const title = source
    .replace(match[0], "")
    .replace(/\s*[—–-]\s*$/, "")
    .trim();
  return { title: title || url, url };
}

function httpsUrl(value: string, file: string, key: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${key} in ${file} must be an https URL`);
  }
  if (url.protocol !== "https:") throw new Error(`${key} in ${file} must be an https URL`);
  return url.toString();
}

export function parseDailyDocument(source: string, filename: string): DailyPrompt {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source.replace(/^\uFEFF/, ""));
  if (!match) throw new Error(`Daily prompt ${filename} needs YAML frontmatter`);
  const parsed: unknown = parse(match[1] ?? "");
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Daily prompt ${filename} frontmatter must be a mapping`);
  }
  const data = parsed as Record<string, unknown>;
  const date = requiredString(data.date, "date", filename);
  const slug = requiredString(data.slug, "slug", filename);
  if (!datePattern.test(date)) throw new Error(`Date in ${filename} must be YYYY-MM-DD`);
  if (!slugPattern.test(slug)) throw new Error(`Slug "${slug}" in ${filename} must be lowercase words separated by hyphens`);
  if (filename !== `${date}-${slug}.md`) {
    throw new Error(`Daily file ${filename} must be named ${date}-${slug}.md`);
  }
  const tags = tagsFrom(data.tags);
  const category = typeof data.category === "string" ? data.category.trim() : "";
  if (tags.length === 0 && !category) throw new Error(`Daily prompt ${filename} needs tags or a category`);
  const sourceText = requiredString(data.source, "source", filename);
  const sourceParts = splitSource(sourceText);
  const xPost = httpsUrl(requiredString(data.x_post_url, "x_post_url", filename), filename, "x_post_url");
  const host = new URL(xPost).hostname.replace(/^www\./, "");
  if (host !== "x.com" && host !== "twitter.com") {
    throw new Error(`x_post_url in ${filename} must be an x.com or twitter.com link`);
  }
  return {
    date,
    title: requiredString(data.title, "title", filename),
    slug,
    category,
    tags,
    whatItDoes: requiredString(data.what_it_does, "what_it_does", filename),
    prompt: requiredString(data.prompt, "prompt", filename),
    setup: requiredString(data.setup, "setup", filename),
    checkIt: requiredString(data.check_it, "check_it", filename),
    source: sourceText,
    sourceTitle: sourceParts.title,
    sourceUrl: sourceParts.url ? httpsUrl(sourceParts.url, filename, "source") : null,
    xPostUrl: xPost,
  };
}

export function dailyDownload(daily: DailyPrompt): string {
  const tags = daily.tags.length > 0 ? `\n\nTags: ${daily.tags.join(", ")}` : "";
  const source = daily.sourceUrl ? `${daily.sourceTitle} — ${daily.sourceUrl}` : daily.source;
  return `# ${daily.title}\n\n${daily.whatItDoes}${tags}\n\n## Prompt\n\n${daily.prompt}\n\n## Setup\n\n${daily.setup}\n\n## Check it\n\n${daily.checkIt}\n\nSource: ${source}\nSeen on X: ${daily.xPostUrl}\n`;
}
