"use client";

import { CopyButton } from "@/components/CopyButton";
import { absoluteUrl, displayUrl } from "@/lib/site";

export function ShareLink({ path }: { path: string }) {
  const url = absoluteUrl(path);
  return (
    <p className="share">
      <code>{displayUrl(path)}</code>
      <CopyButton text={url} label="Copy link" messages={["Link copied", "Ready to post"]} className="btn btn-small" />
    </p>
  );
}
