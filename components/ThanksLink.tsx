import { donationUrl } from "@/lib/site";

export function ThanksLink({ className = "btn btn-thanks" }: { className?: string }) {
  const href = donationUrl();
  if (!href) return null;
  return (
    <a className={className} href={href} rel="noreferrer noopener" target="_blank">
      Say thanks
    </a>
  );
}
