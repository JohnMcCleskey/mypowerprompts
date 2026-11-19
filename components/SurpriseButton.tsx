"use client";

import { useRouter } from "next/navigation";

export function SurpriseButton({ hrefs }: { hrefs: string[] }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-ghost"
      disabled={hrefs.length === 0}
      onClick={() => {
        const href = hrefs[Math.floor(Math.random() * hrefs.length)];
        if (href) router.push(href);
      }}
    >
      Surprise me
    </button>
  );
}
