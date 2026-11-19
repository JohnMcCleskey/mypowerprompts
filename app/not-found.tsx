import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-head">
      <p className="eyebrow">Missing</p>
      <h1>That one isn&apos;t on the shelf.</h1>
      <p className="lede">The link may have changed, or the item has not been added yet.</p>
      <div className="hero-actions">
        <Link className="btn" href="/catalog">
          Back to the catalog
        </Link>
      </div>
    </header>
  );
}
