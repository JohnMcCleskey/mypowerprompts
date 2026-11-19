"use client";

import { useEffect, useState } from "react";
import { readKept, toggleKept } from "@/lib/kept";

export function SaveButton({ saveId }: { saveId: string }) {
  const [kept, setKept] = useState(false);

  useEffect(() => {
    setKept(readKept().includes(saveId));
  }, [saveId]);

  return (
    <button
      type="button"
      className="btn btn-ghost"
      aria-pressed={kept}
      onClick={() => setKept(toggleKept(saveId))}
    >
      {kept ? "Kept" : "Keep"}
    </button>
  );
}
