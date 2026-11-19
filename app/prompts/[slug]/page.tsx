import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemHeader } from "@/components/ItemHeader";
import { getPrompt, getPrompts } from "@/lib/content";
import { shareMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPrompts().map((prompt) => ({ slug: prompt.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) return { title: "Not found" };
  return shareMetadata({
    title: prompt.title,
    description: prompt.description,
    path: `/prompts/${prompt.slug}`,
  });
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) notFound();
  const path = `/prompts/${prompt.slug}`;

  return (
    <article className="reading">
      <ItemHeader
        kind="prompt"
        kicker={`Prompt · ${prompt.categoryLabel}`}
        title={prompt.title}
        description={prompt.description}
        author={prompt.author}
        path={path}
        saveId={`prompt:${prompt.slug}`}
        copyText={prompt.body}
        copyLabel="Copy prompt"
        downloadHref={`${path}/download`}
      />
      {prompt.body.includes("[") ? <p className="hint">Swap anything in [brackets] for your own details.</p> : null}
      <pre className="sheet">{prompt.body}</pre>
      {prompt.tags.length > 0 ? (
        <ul className="tags">
          {prompt.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
