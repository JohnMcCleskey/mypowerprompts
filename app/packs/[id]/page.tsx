import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { ItemHeader } from "@/components/ItemHeader";
import { Markdown } from "@/components/Markdown";
import { getPack, getPacks } from "@/lib/content";
import { titleCase } from "@/lib/kinds";
import { shareMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ file?: string }>;
};

const modelLabels: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Claude",
  gemini: "Gemini",
};

export function generateStaticParams() {
  return getPacks().map((pack) => ({ id: pack.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pack = getPack(id);
  if (!pack) return { title: "Not found" };
  return shareMetadata({
    title: pack.title,
    description: pack.description,
    path: `/packs/${pack.id}`,
  });
}

export default async function PackPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { file } = await searchParams;
  const pack = getPack(id);
  if (!pack) notFound();
  const current = pack.files.find((item) => item.name === file) ?? pack.files.find((item) => item.name === pack.leadFile) ?? pack.files[0];
  if (!current) notFound();
  const path = `/packs/${pack.id}`;

  return (
    <article className="reading">
      <ItemHeader
        kind="pack"
        kicker={`Agent pack · ${titleCase(pack.type)}`}
        title={pack.title}
        description={pack.description}
        author={pack.author}
        path={path}
        saveId={`pack:${pack.id}`}
        downloadHref={`${path}/download`}
        downloadLabel="Download pack"
      />
      {pack.recommendedModels.length > 0 ? (
        <ul className="tags">
          {pack.recommendedModels.map((model) => (
            <li key={model}>{modelLabels[model] ?? model}</li>
          ))}
        </ul>
      ) : null}
      {pack.variables.length > 0 ? (
        <div className="callout">
          <strong>Have these ready. </strong>
          {pack.variables.map((variable) => variable.label).join(" · ")}
        </div>
      ) : null}
      <nav className="file-tabs" aria-label="Pack files">
        {pack.files.map((item) => (
          <Link
            key={item.name}
            href={item.name === pack.leadFile ? path : `${path}?file=${encodeURIComponent(item.name)}`}
            aria-current={item.name === current.name ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="actions">
        <CopyButton text={current.content} label={`Copy ${current.name}`} />
        <a className="btn btn-ghost" href={`${path}/file?name=${encodeURIComponent(current.name)}`}>
          Download file
        </a>
      </div>
      {current.name.endsWith(".json") ? <pre className="sheet">{current.content}</pre> : <Markdown source={current.content} />}
    </article>
  );
}
