import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

export function shareMetadata({
  title,
  description,
  path,
  type = "article",
}: {
  title: string;
  description: string;
  path: string;
  type?: "article" | "website";
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  const socialTitle = title === siteName ? title : `${title} · ${siteName}`;
  return {
    title: title === siteName ? { absolute: siteName } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
