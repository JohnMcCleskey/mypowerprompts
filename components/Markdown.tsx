import type { ReactNode } from "react";

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[2]) nodes.push(<strong key={`${keyPrefix}-b${index}`}>{match[2]}</strong>);
    else nodes.push(<code key={`${keyPrefix}-c${index}`}>{match[3]}</code>);
    last = match.index + match[0].length;
    index += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const content = inline(heading[2] ?? "", `h${key}`);
      if (level === 1) blocks.push(<h2 key={key}>{content}</h2>);
      else if (level === 2) blocks.push(<h3 key={key}>{content}</h3>);
      else blocks.push(<h4 key={key}>{content}</h4>);
      key += 1;
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const buffer: string[] = [];
      index += 1;
      while (index < lines.length && !(lines[index] ?? "").startsWith("```")) {
        buffer.push(lines[index] ?? "");
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(
        <pre key={key} className="sheet">
          <code>{buffer.join("\n")}</code>
        </pre>,
      );
      key += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index] ?? "")) {
        items.push((lines[index] ?? "").replace(/^\s*[-*]\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ul key={key}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{inline(item, `u${key}-${itemIndex}`)}</li>
          ))}
        </ul>,
      );
      key += 1;
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index] ?? "")) {
        items.push((lines[index] ?? "").replace(/^\s*\d+[.)]\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={key}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{inline(item, `o${key}-${itemIndex}`)}</li>
          ))}
        </ol>,
      );
      key += 1;
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      (lines[index] ?? "").trim() &&
      !/^(#{1,3})\s+/.test(lines[index] ?? "") &&
      !(lines[index] ?? "").startsWith("```") &&
      !/^\s*[-*]\s+/.test(lines[index] ?? "") &&
      !/^\s*\d+[.)]\s+/.test(lines[index] ?? "")
    ) {
      paragraph.push(lines[index] ?? "");
      index += 1;
    }
    blocks.push(<p key={key}>{inline(paragraph.join(" "), `p${key}`)}</p>);
    key += 1;
  }

  return <div className="doc">{blocks}</div>;
}
