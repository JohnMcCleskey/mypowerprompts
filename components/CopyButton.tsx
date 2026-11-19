"use client";

import { useState } from "react";

const defaultMessages = ["Copied", "Go paste it", "It's yours"];

type CopyButtonProps = {
  text: string;
  label?: string;
  messages?: string[];
  className?: string;
};

export function CopyButton({
  text,
  label = "Copy",
  messages = defaultMessages,
  className = "btn",
}: CopyButtonProps) {
  const [note, setNote] = useState<string | null>(null);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      const next = messages[Math.floor(Math.random() * messages.length)] ?? "Copied";
      setNote(next);
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
