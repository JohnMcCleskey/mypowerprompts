import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { ShareLink } from "@/components/ShareLink";
import { getUpdate, getUpdates } from "@/lib/content";
import { shareMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getUpdates().map((update) => ({ slug: update.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) return { title: "Not found" };
  return shareMetadata({
    title: update.title,
    description: update.description,
    path: `/whats-new/${update.slug}`,
  });
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const update = getUpdate(slug);
  if (!update) notFound();
  const path = `/whats-new/${update.slug}`;

  return (
    <article className="reading">
      <p className="crumbs">
        <Link href="/whats-new">What&apos;s new</Link>
      </p>
      {update.example ? <p className="example-banner">Example entry. This is a placeholder for the format, not a real pick.</p> : null}
      <p className="eyebrow">What&apos;s new</p>
      <h1>{update.title}</h1>
      <p className="lede">{update.description}</p>
      <p className="byline">
        {formatDate(update.date)}
        {update.author ? ` · Added by ${update.author}` : ""}
      </p>
      <ShareLink path={path} />
      <Markdown source={update.body} />
    </article>
  );
}
