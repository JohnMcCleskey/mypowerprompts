import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseFrontmatter } from "../lib/frontmatter";
import { getCatalog, getDailyPrompts, getFrameworks, getNews, getPacks, getPrompts, getShelf, getUpdates } from "../lib/content";
import { splitSource } from "../lib/daily";
import { sanitizeDonationUrl } from "../lib/site";
import { zipStore } from "../lib/zip";

const root = process.cwd();

test("catalog has the public shelf", () => {
  const prompts = getPrompts();
  const frameworks = getFrameworks();
  const packs = getPacks();
  const updates = getUpdates();
  assert.equal(prompts.length, 120);
  assert.equal(frameworks.length, 12);
  assert.equal(packs.length, 9);
  assert.equal(new Set(prompts.map((prompt) => prompt.slug)).size, 120);
  assert.ok(prompts.every((prompt) => prompt.title && prompt.description && prompt.body));
  assert.ok(frameworks.every((framework) => framework.practicePrompt.length > 0));
  assert.ok(packs.every((pack) => pack.files.some((file) => file.name.endsWith(".md"))));
  assert.equal(updates.length, 0);
  assert.equal(updates.some((update) => update.example), false);
  const daily = getDailyPrompts();
  assert.equal(daily.length, 1);
  assert.equal(daily[0]?.slug, "improvement-log");
  assert.equal(daily[0]?.date, "2026-11-19");
  assert.match(daily[0]?.prompt ?? "", /Improvement Log/);
  assert.equal(daily[0]?.sourceUrl, "https://arxiv.org/abs/2611.18856");
  assert.match(daily[0]?.sourceTitle ?? "", /Self-Improvement Memory paper/);
  assert.equal(daily[0]?.xPostUrl, "https://x.com/i/status/2123460248530755875");
  const news = getNews();
  assert.equal(news[0]?.href, "/p/improvement-log");
  assert.equal(news[0]?.kind, "daily");
  assert.equal(news.some((item) => item.example), false);
  assert.equal(getShelf().length, 6);
  const hrefs = getCatalog().map((item) => item.href);
  assert.equal(new Set(hrefs).size, hrefs.length);
});

test("source lines keep the title and the url", () => {
  const split = splitSource("Self-Improvement Memory paper, Nov 18, 2026 — https://arxiv.org/abs/2611.18856");
  assert.equal(split.url, "https://arxiv.org/abs/2611.18856");
  assert.match(split.title, /Self-Improvement Memory paper/);
});

test("frontmatter keeps quoted titles", () => {
  const parsed = parseFrontmatter('---\ntitle: "Nature Documentary: Office Edition"\n---\n\nHello\n');
  assert.equal(parsed.data.title, "Nature Documentary: Office Edition");
  assert.equal(parsed.body.trim(), "Hello");
});

test("pack zip round-trips", () => {
  const pack = getPacks()[0];
  assert.ok(pack);
  const zip = zipStore(pack.files.map((file) => ({ name: `${pack.id}/${file.name}`, data: Buffer.from(file.content, "utf8") })));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pack-"));
  const archive = path.join(dir, "pack.zip");
  fs.writeFileSync(archive, zip);
  execFileSync("python3", ["-m", "zipfile", "-t", archive], { stdio: "pipe" });
  execFileSync("python3", ["-m", "zipfile", "-e", archive, dir], { stdio: "pipe" });
  assert.equal(fs.readFileSync(path.join(dir, pack.id, pack.leadFile), "utf8"), pack.files.find((file) => file.name === pack.leadFile)?.content);
});

test("donation links only accept http(s)", () => {
  assert.equal(sanitizeDonationUrl(undefined), null);
  assert.equal(sanitizeDonationUrl("   "), null);
  assert.equal(sanitizeDonationUrl("javascript:alert(1)"), null);
  assert.equal(sanitizeDonationUrl("https://example.com/thanks"), "https://example.com/thanks");
});

test("the tree has no secrets or private project files", () => {
  const needles = [
    ["ops@", "stonewave.life"].join(""),
    ["postgres", "://"].join(""),
    ["postgresql", "://"].join(""),
    ["sk_", "live_"].join(""),
    ["sk_", "test_"].join(""),
    ["rk_", "live_"].join(""),
    ["wh", "sec_"].join(""),
    ["BEGIN RSA ", "PRIVATE KEY"].join(""),
    ["BEGIN OPENSSH ", "PRIVATE KEY"].join(""),
    ["DEVELOPMENT", "_TEAM"].join(""),
    ["@cle", "rk/"].join(""),
    ["neon", ".tech"].join(""),
  ];
  const skip = new Set([".git", "node_modules", ".next", "coverage"]);
  const textExt = new Set([".ts", ".tsx", ".js", ".mjs", ".md", ".json", ".css", ".yml", ".yaml", ".example", ".gitignore", ".txt"]);
  const hits: string[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name) || entry.name.startsWith("._")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const ext = path.extname(entry.name);
      if (!textExt.has(ext) && entry.name !== ".gitignore" && entry.name !== ".env.example") continue;
      const text = fs.readFileSync(full, "utf8");
      for (const needle of needles) {
        if (text.includes(needle)) hits.push(`${path.relative(root, full)} contains ${needle}`);
      }
    }
  }

  walk(root);
  assert.deepEqual(hits, []);
  assert.equal(fs.existsSync(path.join(root, ".env")), false);
  assert.equal(fs.existsSync(path.join(root, ".env.local")), false);
  const gitignore = fs.readFileSync(path.join(root, ".gitignore"), "utf8");
  assert.match(gitignore, /^\.env\*$/m);
  assert.match(gitignore, /^!\.env\.example$/m);
  assert.match(gitignore, /^\.next$/m);
});
