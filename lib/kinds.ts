import type { Kind } from "@/lib/types";

export function isKind(value: string | null | undefined): value is Kind {
  return value === "prompt" || value === "pack" || value === "framework";
}

export function kindLabel(kind: Kind): string {
  switch (kind) {
    case "prompt":
      return "Prompt";
    case "pack":
      return "Agent pack";
    case "framework":
      return "Framework";
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

export function kindPlural(kind: Kind): string {
  switch (kind) {
    case "prompt":
      return "Prompts";
    case "pack":
      return "Agent packs";
    case "framework":
      return "Frameworks";
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

export function catalogHref(kind: Kind): string {
  switch (kind) {
    case "prompt":
      return "/catalog?kind=prompt";
    case "pack":
      return "/catalog?kind=pack";
    case "framework":
      return "/catalog?kind=framework";
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

export function itemPath(kind: Kind, slug: string): string {
  switch (kind) {
    case "prompt":
      return `/prompts/${slug}`;
    case "pack":
      return `/packs/${slug}`;
    case "framework":
      return `/frameworks/${slug}`;
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

export function titleCase(value: string): string {
  if (!value) return value;
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
