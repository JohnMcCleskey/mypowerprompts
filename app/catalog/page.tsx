import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { getCatalog } from "@/lib/content";
import { isKind, kindPlural } from "@/lib/kinds";
import { shareMetadata } from "@/lib/seo";

type CatalogPageProps = {
  searchParams: Promise<{ kind?: string; q?: string; category?: string }>;
};

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const kind = isKind(params.kind) ? params.kind : null;
  const title = kind ? kindPlural(kind) : "Catalog";
  const description = kind
    ? `Browse ${kindPlural(kind).toLowerCase()} from the Power Prompts shelf.`
    : "Search prompts, thinking frameworks, and agent packs. Copy one and take it with you.";
  const query = new URLSearchParams();
  if (kind) query.set("kind", kind);
  if (params.category) query.set("category", params.category);
  if (params.q) query.set("q", params.q);
  const path = query.size ? `/catalog?${query.toString()}` : "/catalog";
  return shareMetadata({ title, description, path });
}

export default function CatalogPage() {
  const items = getCatalog();
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">The shelf</p>
        <h1>Catalog</h1>
        <p className="lede">Search, or pick a kind. Every result opens a page with its own link.</p>
      </header>
      <Suspense fallback={<p className="muted">Opening the shelf…</p>}>
        <CatalogBrowser items={items} />
      </Suspense>
    </>
  );
}
