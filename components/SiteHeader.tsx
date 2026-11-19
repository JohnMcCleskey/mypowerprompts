import Image from "next/image";
import Link from "next/link";
import { ThanksLink } from "@/components/ThanksLink";
import { appStoreUrl } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Power Prompts, home">
          <Image src="/power-prompts-icon.png" alt="" width={40} height={40} priority />
          <span>
            <span className="brand-name">Power Prompts</span>
            <span className="brand-tag">Free public shelf</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/catalog">Catalog</Link>
          <Link href="/whats-new">What&apos;s new</Link>
          <a className="text-link" href={appStoreUrl} rel="noreferrer noopener">
            Get the app
          </a>
          <ThanksLink />
        </nav>
      </div>
    </header>
  );
}
