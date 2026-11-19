import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { SaveButton } from "@/components/SaveButton";
import { ShareLink } from "@/components/ShareLink";
import { catalogHref, kindLabel, kindPlural } from "@/lib/kinds";
import type { Kind } from "@/lib/types";

export function ItemHeader({
  kind,
  kicker,
  title,
  description,
  author,
  path,
  saveId,
  copyText,
  copyLabel = "Copy",
  downloadHref,
  downloadLabel = "Download",
}: {
  kind: Kind;
  kicker: string;
  title: string;
  description: string;
  author?: string;
  path: string;
  saveId: string;
  copyText?: string;
  copyLabel?: string;
  downloadHref?: string;
  downloadLabel?: string;
}) {
  return (
    <header className="item-head">
      <p className="crumbs">
        <Link href="/catalog">Catalog</Link>
        <span aria-hidden="true">/</span>
        <Link href={catalogHref(kind)}>{kindPlural(kind)}</Link>
      </p>
      <p className="eyebrow">{kicker || kindLabel(kind)}</p>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
      {author ? (
        <p className="byline">
          Added by <span>{author}</span>
        </p>
      ) : null}
      <ShareLink path={path} />
      <div className="actions">
        {copyText ? <CopyButton text={copyText} label={copyLabel} /> : null}
        {downloadHref ? (
          <a className="btn btn-ghost" href={downloadHref}>
            {downloadLabel}
          </a>
        ) : null}
        <SaveButton saveId={saveId} />
      </div>
    </header>
  );
}
