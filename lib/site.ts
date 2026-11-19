export const siteName = "Power Prompts";

export const siteDescription =
  "A free shelf of prompts, ways of thinking, and agent packs you can copy into the tools you already use.";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mypowerprompts.com"
).replace(/\/$/, "");

export const appStoreUrl = "https://apps.apple.com/app/id6760565430";

export const repoUrl = "https://github.com/JohnMcCleskey/mypowerprompts";

export function sanitizeDonationUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function donationUrl(): string | null {
  return sanitizeDonationUrl(process.env.NEXT_PUBLIC_DONATION_URL);
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function displayUrl(path: string): string {
  return absoluteUrl(path).replace(/^https:\/\//, "");
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
