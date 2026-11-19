import Link from "next/link";
import { CatalogCard } from "@/components/CatalogCard";
import { SurpriseButton } from "@/components/SurpriseButton";
import { getCatalog, getFrameworks, getNews, getPacks, getPrompts, getShelf, newsKindLabel } from "@/lib/content";
import { formatDate, siteDescription } from "@/lib/site";
import { shareMetadata } from "@/lib/seo";

export const metadata = shareMetadata({
  title: "Power Prompts",
  description: siteDescription,
  path: "/",
  type: "website",
});

export default function HomePage() {
  const prompts = getPrompts();
  const frameworks = getFrameworks();
  const packs = getPacks();
  const shelf = getShelf();
  const latest = getNews()[0];
  const hrefs = getCatalog().map((item) => item.href);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Free, on purpose</p>
          <h1>A public shelf for better prompts.</h1>
          <p className="lede">
            Prompts, ways of thinking, and agent setups you can copy into the tools you already use. Free, so you can spend the hour on the work — or on someone you like.
          </p>
          <form className="search" action="/catalog" method="get" role="search">
            <label className="sr-only" htmlFor="home-search">
              Search the shelf
            </label>
            <input id="home-search" name="q" placeholder="Try deep work, agents, or inversion" />
            <button className="btn" type="submit">
              Search
            </button>
          </form>
          <div className="hero-actions">
            <Link className="btn" href="/catalog">
              Browse the shelf
            </Link>
            <SurpriseButton hrefs={hrefs} />
          </div>
        </div>
        {latest ? (
          <article className="news-card">
            <p className="eyebrow">What&apos;s new</p>
            {latest.example ? <p className="stamp">Example</p> : null}
            <h2>
              <Link href={latest.href}>{latest.title}</Link>
            </h2>
            <p>{latest.description}</p>
            <p className="meta">
              {formatDate(latest.date)} · {newsKindLabel(latest.kind)}
              {latest.author ? ` · ${latest.author}` : ""}
            </p>
            <Link className="text-link" href="/whats-new">
              All notes
            </Link>
          </article>
        ) : null}
      </section>

      <ul className="index-list">
        <li>
          <Link href="/catalog?kind=prompt">
            <strong>Prompts</strong>
            <span>Lines you can paste into a chat today.</span>
            <span>{prompts.length}</span>
          </Link>
        </li>
        <li>
          <Link href="/catalog?kind=framework">
            <strong>Frameworks</strong>
            <span>Ways to think before you ask.</span>
            <span>{frameworks.length}</span>
          </Link>
        </li>
        <li>
          <Link href="/catalog?kind=pack">
            <strong>Agent packs</strong>
            <span>Files you can drop into your own stack.</span>
            <span>{packs.length}</span>
          </Link>
        </li>
      </ul>

      <div className="section-head">
        <h2>Worth opening</h2>
      </div>
      <div className="shelf">
        {shelf.map((item) => (
          <CatalogCard key={item.saveId} item={item} />
        ))}
      </div>
    </>
  );
}
