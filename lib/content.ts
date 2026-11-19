import fs from "node:fs";
import path from "node:path";
import { dailyDownload, parseDailyDocument } from "@/lib/daily";
import { parseFrontmatter } from "@/lib/frontmatter";
import { itemPath, titleCase } from "@/lib/kinds";
import type {
  CatalogItem,
  CategoryMeta,
  DailyPrompt,
  FrameworkItem,
  FrameworkSection,
  Kind,
  NewsItem,
  NewsKind,
  PackFile,
  PackItem,
  PackVariable,
  PromptItem,
  ShelfEntry,
  UpdateItem,
} from "@/lib/types";

const contentRoot = path.join(process.cwd(), "content");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const fileOrder = [
  "PROMPT.md",
  "AGENT.md",
  "README.md",
  "SYSTEM.md",
  "STYLE.md",
  "TOOLS.md",
  "MEMORY.md",
  "WORKFLOW.md",
  "LOOP.md",
  "SPRINT.md",
  "ROUTINES.md",
  "HANDOFFS.md",
  "INPUTS.md",
  "OUTPUTS.md",
  "EXAMPLES.md",
  "EVALS.md",
  "pack.json",
];

type Library = {
  categories: CategoryMeta[];
  prompts: PromptItem[];
  frameworks: FrameworkItem[];
  packs: PackItem[];
  updates: UpdateItem[];
  daily: DailyPrompt[];
  shelf: ShelfEntry[];
};

let cached: Library | null = null;

function requireField(data: Record<string, string>, key: string, file: string): string {
  const value = data[key]?.trim();
  if (!value) throw new Error(`Missing ${key} in ${file}`);
  return value;
}

function assertSlug(slug: string, file: string): void {
  if (!slugPattern.test(slug)) throw new Error(`Slug "${slug}" in ${file} must be lowercase words separated by hyphens`);
}

function splitTags(value: string | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function compareLegacy(a: string, b: string): number {
  const left = /^(.*?)(\d+)$/.exec(a);
  const right = /^(.*?)(\d+)$/.exec(b);
  if (!left || !right) return a.localeCompare(b);
  if (left[1] !== right[1]) return left[1].localeCompare(right[1]);
  return Number(left[2]) - Number(right[2]);
}

function readMarkdown(file: string): { data: Record<string, string>; body: string } {
  return parseFrontmatter(fs.readFileSync(file, "utf8"));
}

function loadCategories(): CategoryMeta[] {
  const file = path.join(contentRoot, "categories.json");
  const parsed: unknown = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!parsed || typeof parsed !== "object" || !("prompts" in parsed) || !Array.isArray(parsed.prompts)) {
    throw new Error("content/categories.json needs a prompts array");
  }
  return parsed.prompts.map((entry) => {
    if (!entry || typeof entry !== "object") throw new Error("Bad prompt category");
    const category = entry as Partial<CategoryMeta>;
    if (!category.id || !category.name || !category.description) {
      throw new Error("Each prompt category needs id, name, and description");
    }
    return { id: category.id, name: category.name, description: category.description };
  });
}

function loadPrompts(categories: CategoryMeta[]): PromptItem[] {
  const dir = path.join(contentRoot, "prompts");
  const labels = new Map(categories.map((category) => [category.id, category.name]));
  const prompts = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const file = path.join(dir, name);
      const { data, body } = readMarkdown(file);
      const slug = requireField(data, "slug", file);
      assertSlug(slug, file);
      if (`${slug}.md` !== name) throw new Error(`Slug does not match filename: ${name}`);
      const category = requireField(data, "category", file);
      const categoryLabel = labels.get(category);
      if (!categoryLabel) throw new Error(`Unknown category "${category}" in ${name}`);
      const prompt: PromptItem = {
        slug,
        legacyId: requireField(data, "id", file),
        title: requireField(data, "title", file),
        description: requireField(data, "description", file),
        category,
        categoryLabel,
        tags: splitTags(data.tags),
        set: data.set?.trim() ?? "",
        author: data.author?.trim() ?? "",
        body: body.trim(),
      };
      if (!prompt.body) throw new Error(`Empty prompt in ${name}`);
      return prompt;
    });

  return prompts.sort((a, b) => {
    const left = categories.findIndex((category) => category.id === a.category);
    const right = categories.findIndex((category) => category.id === b.category);
    if (left !== right) return left - right;
    return compareLegacy(a.legacyId, b.legacyId);
  });
}

function frameworkSections(body: string): FrameworkSection[] {
  return body
    .split(/^## /m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const breakAt = chunk.indexOf("\n");
      const heading = (breakAt === -1 ? chunk : chunk.slice(0, breakAt)).trim();
      const text = breakAt === -1 ? "" : chunk.slice(breakAt + 1).trim();
      return { id: heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), heading, body: text };
    });
}

function loadFrameworks(): FrameworkItem[] {
  const dir = path.join(contentRoot, "frameworks");
  const difficulties = new Set(["foundational", "intermediate", "advanced"]);
  const frameworks = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const file = path.join(dir, name);
      const { data, body } = readMarkdown(file);
      const slug = requireField(data, "slug", file);
      assertSlug(slug, file);
      if (`${slug}.md` !== name) throw new Error(`Slug does not match filename: ${name}`);
      const difficulty = requireField(data, "difficulty", file);
      if (!difficulties.has(difficulty)) throw new Error(`Unknown difficulty "${difficulty}" in ${name}`);
      const sections = frameworkSections(body);
      const practicePrompt = sections.find((section) => section.heading.toLowerCase() === "practice prompt")?.body ?? "";
      return {
        slug,
        title: requireField(data, "title", file),
        description: requireField(data, "description", file),
        origin: data.origin?.trim() ?? "",
        difficulty,
        author: data.author?.trim() ?? "",
        order: Number(data.order ?? "999"),
        sections,
        practicePrompt,
      } satisfies FrameworkItem;
    });

  return frameworks.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

function sortPackFiles(names: string[]): string[] {
  return [...names].sort((a, b) => {
    const left = fileOrder.indexOf(a);
    const right = fileOrder.indexOf(b);
    const leftRank = left === -1 ? fileOrder.length : left;
    const rightRank = right === -1 ? fileOrder.length : right;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return a.localeCompare(b);
  });
}

function loadPackOrder(): string[] {
  const file = path.join(contentRoot, "packs", "index.json");
  const parsed: unknown = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!parsed || typeof parsed !== "object" || !("families" in parsed) || !Array.isArray(parsed.families)) {
    throw new Error("content/packs/index.json needs a families array");
  }
  const order: string[] = [];
  for (const family of parsed.families) {
    if (!family || typeof family !== "object" || !("packs" in family) || !Array.isArray(family.packs)) continue;
    for (const id of family.packs) {
      if (typeof id === "string") order.push(id);
    }
  }
  return order;
}

function loadVariables(value: unknown): PackVariable[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const variable = entry as Partial<PackVariable>;
    if (!variable.key || !variable.label) return [];
    return [{ key: variable.key, label: variable.label, required: Boolean(variable.required) }];
  });
}

function loadPacks(): PackItem[] {
  const dir = path.join(contentRoot, "packs");
  const folders = fs
    .readdirSync(dir)
    .filter((name) => fs.existsSync(path.join(dir, name, "pack.json")));
  const preferred = loadPackOrder();
  const ordered = [
    ...preferred.filter((id) => folders.includes(id)),
    ...folders.filter((id) => !preferred.includes(id)).sort(),
  ];

  return ordered.map((id) => {
    const folder = path.join(dir, id);
    const manifestPath = path.join(folder, "pack.json");
    const manifest: unknown = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (!manifest || typeof manifest !== "object") throw new Error(`Bad pack.json in ${id}`);
    const record = manifest as Record<string, unknown>;
    const manifestId = typeof record.id === "string" ? record.id : "";
    if (manifestId !== id) throw new Error(`pack.json id "${manifestId}" must match folder "${id}"`);
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const summary = typeof record.summary === "string" ? record.summary.trim() : "";
    if (!title || !summary) throw new Error(`Pack ${id} needs a title and summary`);
    const type = typeof record.type === "string" && record.type.trim() ? record.type.trim() : "pack";
    const names = sortPackFiles(
      fs.readdirSync(folder).filter((name) => !name.startsWith(".") && (name.endsWith(".md") || name.endsWith(".json"))),
    );
    const files: PackFile[] = names.map((name) => ({
      name,
      content: fs.readFileSync(path.join(folder, name), "utf8"),
    }));
    const leadFile = files.find((file) => file.name.endsWith(".md"))?.name ?? files[0]?.name ?? "";
    if (!leadFile) throw new Error(`Pack ${id} has no files`);
    return {
      id,
      title,
      description: summary,
      version: typeof record.version === "string" ? record.version : "",
      type,
      categories: stringList(record.categories),
      tags: stringList(record.tags),
      author: typeof record.author === "string" ? record.author.trim() : "",
      maturity: typeof record.maturity === "string" ? record.maturity : "",
      recommendedModels: stringList(record.recommendedModels),
      variables: loadVariables(record.variables),
      files,
      leadFile,
    };
  });
}

function loadUpdates(): UpdateItem[] {
  const dir = path.join(contentRoot, "whats-new");
  const updates = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
    .map((name) => {
      const file = path.join(dir, name);
      const { data, body } = readMarkdown(file);
      const slug = requireField(data, "slug", file);
      assertSlug(slug, file);
      if (`${slug}.md` !== name) throw new Error(`Slug does not match filename: ${name}`);
      const date = requireField(data, "date", file);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Date in ${name} must be YYYY-MM-DD`);
      const text = body.trim();
      if (!text) throw new Error(`Empty What's new entry: ${name}`);
      return {
        slug,
        title: requireField(data, "title", file),
        description: requireField(data, "description", file),
        date,
        author: data.author?.trim() ?? "",
        example: data.example === "true",
        body: text,
      } satisfies UpdateItem;
    });

  return updates.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

function loadDaily(): DailyPrompt[] {
  const dir = path.join(contentRoot, "daily");
  if (!fs.existsSync(dir)) return [];
  const prompts = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
    .map((name) => parseDailyDocument(fs.readFileSync(path.join(dir, name), "utf8"), name));
  const slugs = new Set<string>();
  for (const prompt of prompts) {
    if (slugs.has(prompt.slug)) throw new Error(`Duplicate daily prompt slug: ${prompt.slug}`);
    slugs.add(prompt.slug);
  }
  return prompts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

function loadShelf(): ShelfEntry[] {
  const parsed: unknown = JSON.parse(fs.readFileSync(path.join(contentRoot, "shelf.json"), "utf8"));
  if (!Array.isArray(parsed)) throw new Error("content/shelf.json must be an array");
  return parsed.map((entry) => {
    if (!entry || typeof entry !== "object") throw new Error("Bad shelf entry");
    const record = entry as Partial<ShelfEntry>;
    if (record.kind !== "prompt" && record.kind !== "pack" && record.kind !== "framework") {
      throw new Error("Shelf entries need kind prompt, pack, or framework");
    }
    return { kind: record.kind, id: record.id, slug: record.slug };
  });
}

function loadLibrary(): Library {
  const categories = loadCategories();
  return {
    categories,
    prompts: loadPrompts(categories),
    frameworks: loadFrameworks(),
    packs: loadPacks(),
    updates: loadUpdates(),
    daily: loadDaily(),
    shelf: loadShelf(),
  };
}

function library(): Library {
  if (cached && process.env.NODE_ENV === "production") return cached;
  cached = loadLibrary();
  return cached;
}

function catalogFromPrompt(prompt: PromptItem): CatalogItem {
  return {
    kind: "prompt",
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.description,
    category: prompt.category,
    categoryLabel: prompt.categoryLabel,
    tags: prompt.tags,
    author: prompt.author,
    href: itemPath("prompt", prompt.slug),
    rawHref: `/prompts/${prompt.slug}/raw`,
    downloadHref: `/prompts/${prompt.slug}/download`,
    saveId: `prompt:${prompt.slug}`,
  };
}

function catalogFromFramework(framework: FrameworkItem): CatalogItem {
  return {
    kind: "framework",
    slug: framework.slug,
    title: framework.title,
    description: framework.description,
    category: framework.difficulty,
    categoryLabel: titleCase(framework.difficulty),
    tags: framework.origin ? [framework.origin] : [],
    author: framework.author,
    href: itemPath("framework", framework.slug),
    rawHref: `/frameworks/${framework.slug}/raw`,
    downloadHref: `/frameworks/${framework.slug}/download`,
    saveId: `framework:${framework.slug}`,
  };
}

function catalogFromPack(pack: PackItem): CatalogItem {
  return {
    kind: "pack",
    slug: pack.id,
    title: pack.title,
    description: pack.description,
    category: pack.type,
    categoryLabel: titleCase(pack.type),
    tags: pack.tags,
    author: pack.author,
    href: itemPath("pack", pack.id),
    rawHref: `/packs/${pack.id}/raw`,
    downloadHref: `/packs/${pack.id}/download`,
    saveId: `pack:${pack.id}`,
  };
}

export function getCategories(): CategoryMeta[] {
  return library().categories;
}

export function getPrompts(): PromptItem[] {
  return library().prompts;
}

export function getPrompt(slug: string): PromptItem | undefined {
  return library().prompts.find((prompt) => prompt.slug === slug);
}

export function getFrameworks(): FrameworkItem[] {
  return library().frameworks;
}

export function getFramework(slug: string): FrameworkItem | undefined {
  return library().frameworks.find((framework) => framework.slug === slug);
}

export function getPacks(): PackItem[] {
  return library().packs;
}

export function getPack(id: string): PackItem | undefined {
  return library().packs.find((pack) => pack.id === id);
}

export function getUpdates(): UpdateItem[] {
  return library().updates;
}

export function getUpdate(slug: string): UpdateItem | undefined {
  return library().updates.find((update) => update.slug === slug);
}

export function getDailyPrompts(): DailyPrompt[] {
  return library().daily;
}

export function getDailyPrompt(slug: string): DailyPrompt | undefined {
  return library().daily.find((prompt) => prompt.slug === slug);
}

export function newsKindLabel(kind: NewsKind): string {
  switch (kind) {
    case "daily":
      return "Daily prompt";
    case "note":
      return "Note";
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

export function getNews(): NewsItem[] {
  const data = library();
  const daily: NewsItem[] = data.daily.map((prompt) => ({
    key: `daily:${prompt.slug}`,
    slug: prompt.slug,
    title: prompt.title,
    description: prompt.whatItDoes,
    date: prompt.date,
    href: `/p/${prompt.slug}`,
    example: false,
    author: "",
    kind: "daily",
  }));
  const notes: NewsItem[] = data.updates.map((update) => ({
    key: `note:${update.slug}`,
    slug: update.slug,
    title: update.title,
    description: update.description,
    date: update.date,
    href: `/whats-new/${update.slug}`,
    example: update.example,
    author: update.author,
    kind: "note",
  }));
  return [...daily, ...notes].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export { dailyDownload };

export function getCatalog(): CatalogItem[] {
  const data = library();
  return [
    ...data.prompts.map(catalogFromPrompt),
    ...data.frameworks.map(catalogFromFramework),
    ...data.packs.map(catalogFromPack),
  ];
}

export function getShelf(): CatalogItem[] {
  const data = library();
  return data.shelf.map((entry) => {
    if (entry.kind === "prompt") {
      const prompt = data.prompts.find((item) => item.legacyId === entry.id || item.slug === entry.slug);
      if (!prompt) throw new Error(`Shelf prompt not found: ${entry.id ?? entry.slug ?? ""}`);
      return catalogFromPrompt(prompt);
    }
    if (entry.kind === "framework") {
      const framework = data.frameworks.find((item) => item.slug === (entry.slug ?? entry.id));
      if (!framework) throw new Error(`Shelf framework not found: ${entry.slug ?? entry.id ?? ""}`);
      return catalogFromFramework(framework);
    }
    const pack = data.packs.find((item) => item.id === (entry.id ?? entry.slug));
    if (!pack) throw new Error(`Shelf pack not found: ${entry.id ?? entry.slug ?? ""}`);
    return catalogFromPack(pack);
  });
}

export function promptDownload(prompt: PromptItem): string {
  const credit = prompt.author ? `\n\nAdded by ${prompt.author}` : "";
  return `# ${prompt.title}\n\n${prompt.description}${credit}\n\n---\n\n${prompt.body.trim()}\n`;
}

export function readOwnedFile(kind: Kind | "update", slug: string): string | null {
  if (!slugPattern.test(slug)) return null;
  const relative =
    kind === "prompt"
      ? path.join("prompts", `${slug}.md`)
      : kind === "framework"
        ? path.join("frameworks", `${slug}.md`)
        : kind === "update"
          ? path.join("whats-new", `${slug}.md`)
          : null;
  if (!relative) return null;
  const full = path.resolve(contentRoot, relative);
  if (!full.startsWith(`${contentRoot}${path.sep}`)) return null;
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, "utf8");
}
