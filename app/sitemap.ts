import type { MetadataRoute } from "next";
import { getDailyPrompts, getFrameworks, getPacks, getPrompts, getUpdates } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updates = getUpdates();
  const dated = [
    ...updates.map((update) => ({
      url: absoluteUrl(`/whats-new/${update.slug}`),
      lastModified: update.date,
    })),
    ...getDailyPrompts().map((prompt) => ({
      url: absoluteUrl(`/p/${prompt.slug}`),
      lastModified: prompt.date,
    })),
  ];
  const paths = [
    "/",
    "/catalog",
    "/whats-new",
    ...getPrompts().map((prompt) => `/prompts/${prompt.slug}`),
    ...getFrameworks().map((framework) => `/frameworks/${framework.slug}`),
    ...getPacks().map((pack) => `/packs/${pack.id}`),
  ];
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path) })),
    ...dated,
  ];
}
