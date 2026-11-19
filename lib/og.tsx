import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function clip(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function ogImage({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}): ImageResponse {
  const heading = clip(title, 110);
  const fontSize = heading.length > 70 ? 46 : heading.length > 42 ? 58 : 68;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f4f0e6",
          color: "#1d1a16",
        }}
      >
        <div style={{ width: 18, height: "100%", background: "#5b3cc4" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 24,
              letterSpacing: 2,
              color: "#5b3cc4",
            }}
          >
            <span>POWER PROMPTS</span>
            <span>{kicker.toUpperCase()}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            {heading}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#5c564c",
              maxWidth: 920,
            }}
          >
            {clip(description, 170)}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
