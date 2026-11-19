import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { ItemHeader } from "@/components/ItemHeader";
import { Markdown } from "@/components/Markdown";
import { getFramework, getFrameworks } from "@/lib/content";
import { titleCase } from "@/lib/kinds";
import { shareMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFrameworks().map((framework) => ({ slug: framework.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const framework = getFramework(slug);
  if (!framework) return { title: "Not found" };
  return shareMetadata({
    title: framework.title,
    description: framework.description,
    path: `/frameworks/${framework.slug}`,
  });
}

export default async function FrameworkPage({ params }: PageProps) {
  const { slug } = await params;
  const framework = getFramework(slug);
  if (!framework) notFound();
  const path = `/frameworks/${framework.slug}`;

  return (
    <article className="reading">
      <ItemHeader
        kind="framework"
        kicker={`Framework · ${titleCase(framework.difficulty)}`}
        title={framework.title}
        description={framework.description}
        author={framework.author}
        path={path}
        saveId={`framework:${framework.slug}`}
        copyText={framework.practicePrompt || undefined}
        copyLabel="Copy practice prompt"
        downloadHref={`${path}/download`}
      />
      {framework.origin ? <p className="byline">From {framework.origin}</p> : null}
      {framework.sections.map((section) => (
        <section key={section.id}>
          <div className="doc">
            <h2>{section.heading}</h2>
          </div>
          {section.heading.toLowerCase() === "practice prompt" ? (
            <>
              <CopyButton text={section.body} label="Copy practice prompt" className="btn btn-small" />
              <pre className="sheet">{section.body}</pre>
            </>
          ) : (
            <Markdown source={section.body} />
          )}
        </section>
      ))}
    </article>
  );
}
