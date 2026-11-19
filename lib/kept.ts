export const keptKey = "power-prompts-kept";

export function readKept(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(keptKey);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function toggleKept(saveId: string): boolean {
  const current = readKept();
  const next = current.includes(saveId) ? current.filter((id) => id !== saveId) : [...current, saveId];
  window.localStorage.setItem(keptKey, JSON.stringify(next));
  return next.includes(saveId);
}
