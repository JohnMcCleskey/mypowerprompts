import Link from "next/link";
import { getNews, newsKindLabel } from "@/lib/content";
import { shareMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/site";

export const metadata = shareMetadata({
  title: "What's new",
  description: "Daily prompts and short notes, each with a stable link you can post.",
  path: "/whats-new",
});

export default function WhatsNewPage() {
  const news = getNews();
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Daily picks</p>
        <h1>What&apos;s new</h1>
        <p className="lede">Daily prompts show up here. Each one has a short link, ready to post.</p>
      </header>
      <div className="updates">
        {news.map((item) => (
          <Link key={item.key} href={item.href} className="update-row">
            {item.example ? <span className="stamp">Example</span> : null}
            <p className="eyebrow">{newsKindLabel(item.kind)}</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p className="meta">
              {formatDate(item.date)}
              {item.author ? ` · ${item.author}` : ""}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
