"use client";

import { useState } from "react";

const messages = ["Copied", "Go paste it", "It's yours"];

export function CopyFromUrl({ url, label = "Copy", className = "btn btn-small" }: { url: string; label?: string; className?: string }) {
  const [note, setNote] = useState<string | null>(null);

  async function onCopy() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("missing");
      await navigator.clipboard.writeText(await response.text());
      setNote(messages[Math.floor(Math.random() * messages.length)] ?? "Copied");
    } catch {
      setNote("Couldn't copy");
    }
    window.setTimeout(() => setNote(null), 1600);
  }

  return (
    <button
      type="button"
      className={className}
      data-copied={note ? "true" : "false"}
      onClick={() => {
        void onCopy();
      }}
      aria-live="polite"
    >
      {note ?? label}
    </button>
  );
}
