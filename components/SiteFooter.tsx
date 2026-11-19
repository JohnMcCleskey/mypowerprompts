import Link from "next/link";
import { ThanksLink } from "@/components/ThanksLink";
import { appStoreUrl, donationUrl, repoUrl } from "@/lib/site";

export function SiteFooter() {
  const thanks = donationUrl();
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-title">Power Prompts</p>
          <p className="muted">
            This site is free. No account, no subscription.
            {thanks ? " If it saved you an afternoon, you can say thanks." : null}
          </p>
          {thanks ? <ThanksLink /> : null}
        </div>
        <div className="footer-links">
          <Link href="/catalog">Catalog</Link>
          <Link href="/whats-new">What&apos;s new</Link>
          <a href={appStoreUrl} rel="noreferrer noopener">Get the iOS app</a>
          <a href={repoUrl}>Contribute on GitHub</a>
          <a href={`${repoUrl}/blob/main/LICENSE`}>MIT code</a>
          <a href={`${repoUrl}/blob/main/LICENSE-CONTENT`}>CC BY 4.0 content</a>
        </div>
      </div>
    </footer>
  );
}
