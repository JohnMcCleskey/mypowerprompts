export type Kind = "prompt" | "pack" | "framework";

export type CatalogItem = {
  kind: Kind;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  author: string;
  href: string;
  rawHref: string;
  downloadHref: string;
  saveId: string;
};

export type PromptItem = {
  slug: string;
  legacyId: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  set: string;
  author: string;
  body: string;
};

export type FrameworkSection = {
  id: string;
  heading: string;
  body: string;
};

export type FrameworkItem = {
  slug: string;
  title: string;
  description: string;
  origin: string;
  difficulty: string;
  author: string;
  order: number;
  sections: FrameworkSection[];
  practicePrompt: string;
};

export type PackVariable = {
  key: string;
  label: string;
  required: boolean;
};

export type PackFile = {
  name: string;
  content: string;
};

export type PackItem = {
  id: string;
  title: string;
  description: string;
  version: string;
  type: string;
  categories: string[];
  tags: string[];
  author: string;
  maturity: string;
  recommendedModels: string[];
  variables: PackVariable[];
  files: PackFile[];
  leadFile: string;
};

export type UpdateItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  example: boolean;
  body: string;
};

export type DailyPrompt = {
  date: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  whatItDoes: string;
  prompt: string;
  setup: string;
  checkIt: string;
  source: string;
  sourceTitle: string;
  sourceUrl: string | null;
  xPostUrl: string | null;
};

export type NewsKind = "daily" | "note";

export type NewsItem = {
  key: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  href: string;
  example: boolean;
  author: string;
  kind: NewsKind;
};

export type CategoryMeta = {
  id: string;
  name: string;
  description: string;
};

export type ShelfEntry = {
  kind: Kind;
  id?: string;
  slug?: string;
};
