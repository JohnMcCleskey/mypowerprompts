import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { ShareLink } from "@/components/ShareLink";
import { getDailyPrompt, getDailyPrompts } from "@/lib/content";
import { shareMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDailyPrompts().map((prompt) => ({ slug: prompt.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const daily = getDailyPrompt(slug);
  if (!daily) return { title: "Not found" };
  return shareMetadata({
    title: daily.title,
    description: daily.whatItDoes,
    path: `/p/${daily.slug}`,
  });
}

export default async function DailyPromptPage({ params }: PageProps) {
  const { slug } = await params;
  const daily = getDailyPrompt(slug);
  if (!daily) notFound();
  const path = `/p/${daily.slug}`;
  const kicker = ["Daily prompt", daily.category].filter(Boolean).join(" · ");

  return (
    <article className="reading doc">
      <header className="item-head">
        <p className="crumbs">
          <Link href="/whats-new">What&apos;s new</Link>
        </p>
        <p className="eyebrow">{kicker}</p>
        <h1>{daily.title}</h1>
        <p className="lede">{daily.whatItDoes}</p>
        <p className="byline">{formatDate(daily.date)}</p>
        {daily.tags.length > 0 ? (
          <ul className="tags">
            {daily.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
        <ShareLink path={path} />
        <div className="actions">
          <CopyButton text={daily.prompt} label="Copy prompt" />
          <a className="btn btn-ghost" href={`${path}/download`}>
            Download
          </a>
          {daily.xPostUrl ? (
            <a className="btn btn-ghost" href={daily.xPostUrl} rel="noreferrer noopener">
              Seen on X
            </a>
          ) : null}
        </div>
      </header>
      <pre className="sheet">{daily.prompt}</pre>
      <section>
        <h2>Setup</h2>
        <p>{daily.setup}</p>
      </section>
      <section>
        <h2>Check it</h2>
        <p>{daily.checkIt}</p>
      </section>
      <p className="byline">
        Source:{" "}
        {daily.sourceUrl ? (
          <a className="source-link" href={daily.sourceUrl} rel="noreferrer noopener">
            {daily.sourceTitle}
          </a>
        ) : (
          daily.sourceTitle
        )}
      </p>
    </article>
  );
}
