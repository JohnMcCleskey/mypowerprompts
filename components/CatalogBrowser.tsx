"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CatalogCard } from "@/components/CatalogCard";
import { isKind, kindPlural } from "@/lib/kinds";
import { readKept } from "@/lib/kept";
import type { CatalogItem, Kind } from "@/lib/types";

function replaceQuery(router: ReturnType<typeof useRouter>, params: URLSearchParams) {
  const next = params.toString();
  router.replace(next ? `/catalog?${next}` : "/catalog", { scroll: false });
}

export function CatalogBrowser({ items }: { items: CatalogItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const q = searchParams.get("q") ?? "";
  const kindParam = searchParams.get("kind");
  const kind: Kind | "all" = isKind(kindParam) ? kindParam : "all";
  const category = searchParams.get("category") ?? "all";
  const keptOnly = searchParams.get("kept") === "1";
  const [draft, setDraft] = useState(q);
  const [keptIds, setKeptIds] = useState<string[] | null>(null);

  useEffect(() => {
    setDraft(q);
  }, [q]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const current = new URLSearchParams(queryString);
      const currentQuery = current.get("q") ?? "";
      if (draft === currentQuery) return;
      if (draft) current.set("q", draft);
      else current.delete("q");
      replaceQuery(router, current);
    }, 180);
    return () => window.clearTimeout(handle);
  }, [draft, queryString, router]);

  useEffect(() => {
    const sync = () => setKeptIds(readKept());
    sync();
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  const categories = useMemo(() => {
    if (kind === "all") return [];
    const seen = new Map<string, string>();
    for (const item of items) {
      if (item.kind !== kind || seen.has(item.category)) continue;
      seen.set(item.category, item.categoryLabel);
    }
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [items, kind]);

  const filtered = useMemo(() => {
    const words = draft.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      if (kind !== "all" && item.kind !== kind) return false;
      if (category !== "all" && item.category !== category) return false;
      if (words.length === 0) return true;
      const haystack = [item.title, item.description, item.categoryLabel, item.author, ...item.tags]
        .join(" ")
        .toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [items, draft, kind, category]);

  const visible = keptOnly ? (keptIds ? filtered.filter((item) => keptIds.includes(item.saveId)) : []) : filtered;
  const waitingForKept = keptOnly && keptIds === null;

  function setKind(next: Kind | "all") {
    const params = new URLSearchParams(queryString);
    if (next === "all") params.delete("kind");
    else params.set("kind", next);
    params.delete("category");
    replaceQuery(router, params);
  }

  function setCategory(next: string) {
    const params = new URLSearchParams(queryString);
    if (next === "all") params.delete("category");
    else params.set("category", next);
    replaceQuery(router, params);
  }

  function toggleKeptFilter() {
    const params = new URLSearchParams(queryString);
    if (params.get("kept") === "1") params.delete("kept");
    else params.set("kept", "1");
    replaceQuery(router, params);
  }

  function clearAll() {
    setDraft("");
    router.replace("/catalog", { scroll: false });
  }

  const kinds: Array<Kind | "all"> = ["all", "prompt", "pack", "framework"];

  return (
    <div className="catalog">
      <div className="catalog-tools">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="sr-only" htmlFor="catalog-search">
            Search the catalog
          </label>
          <input
            id="catalog-search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search titles, tags, or a feeling"
          />
        </form>
        <div className="chips" role="toolbar" aria-label="Kind">
          {kinds.map((option) => {
            const label = option === "all" ? "All" : kindPlural(option);
            return (
              <button key={option} type="button" className="chip" aria-pressed={kind === option} onClick={() => setKind(option)}>
                {label}
              </button>
            );
          })}
          <button type="button" className="chip" aria-pressed={keptOnly} onClick={toggleKeptFilter}>
            Kept
          </button>
        </div>
        {categories.length > 0 ? (
          <div className="chips" role="toolbar" aria-label="Category">
            <button type="button" className="chip" aria-pressed={category === "all"} onClick={() => setCategory("all")}>
              Any
            </button>
            {categories.map(([id, label]) => (
              <button key={id} type="button" className="chip" aria-pressed={category === id} onClick={() => setCategory(id)}>
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <p className="result-count" aria-live="polite">
        {waitingForKept ? "Looking through what you've kept…" : `${visible.length} ${visible.length === 1 ? "thing" : "things"}`}
      </p>

      {waitingForKept ? null : visible.length === 0 ? (
        <div className="empty">
          <p>{keptOnly ? "Nothing kept on this browser yet. Open something you like and tap Keep." : "Nothing matches. Try a shorter word, or clear the filters."}</p>
          <button type="button" className="btn btn-ghost" onClick={clearAll}>
            Clear
          </button>
        </div>
      ) : (
        <div className="shelf">
          {visible.map((item) => (
            <CatalogCard key={item.saveId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
