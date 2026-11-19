import Link from "next/link";
import { CopyFromUrl } from "@/components/CopyFromUrl";
import { kindLabel } from "@/lib/kinds";
import type { CatalogItem } from "@/lib/types";

export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <article className={`card kind-${item.kind}`}>
      <Link href={item.href} className="card-main">
        <p className="card-kicker">
          <span>{kindLabel(item.kind)}</span>
          <span>{item.categoryLabel}</span>
        </p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </Link>
      <CopyFromUrl url={item.rawHref} label={item.kind === "pack" ? "Copy starter" : "Copy"} />
    </article>
  );
}
