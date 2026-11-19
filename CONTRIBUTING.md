# Contributing

Power Prompts is a public shelf. The useful way to add something is a pull request that puts a file in `content/`. A maintainer will read it before it merges.

Please be kind. The [code of conduct](CODE_OF_CONDUCT.md) is the short version of how to be here.

## What you can add

- A **prompt**: something a person can paste into a chat
- A **framework**: a way of thinking, with a practice prompt
- An **agent pack**: a folder of files someone can drop into Claude, ChatGPT, Gemini, Codex, or another stack
- A **skill, connector, or setup**: same as a pack if it is a bundle of files, or a prompt if it is one copyable text
- A **fun item**: humor is already a prompt category. A playful prompt is welcome
- A **daily prompt**: one file the What's new list and a short `/p/` link both use
- A **What's new** note: an optional short editorial note, when it is not a prompt

You do not need an account on the website. There isn't one.

## Stable links

The filename is the URL. Once a page has been shared, do not rename the slug.

| You add | File | Page |
| --- | --- | --- |
| Prompt | `content/prompts/my-prompt.md` | `/prompts/my-prompt` |
| Framework | `content/frameworks/my-framework.md` | `/frameworks/my-framework` |
| Pack | `content/packs/my-pack/` | `/packs/my-pack` |
| Daily prompt | `content/daily/YYYY-MM-DD-slug.md` | `/p/<slug>` |
| What's new | `content/whats-new/my-note.md` | `/whats-new/my-note` |

Slugs are lowercase words separated by hyphens. Open Graph title and description come from `title` and `description`, so write the description as one sentence that still makes sense in a social post.

## A prompt

```markdown
---
slug: "my-prompt"
id: "my-prompt"
title: "My prompt"
description: "One sentence someone can scan in the catalog."
category: "productivity"
tags: "planning, focus"
set: "1"
author: "Your name"
---

The prompt itself, ready to paste.

Replace anything in [BRACKETS] with the reader's own details.
```

`category` must match an id in `content/categories.json`. Add a category there first if you need a new shelf. `author` is optional and shows on the page. `id` can match the slug for new prompts.

## A framework

```markdown
---
slug: "my-framework"
title: "My framework"
description: "The line that shows in the catalog and in link previews."
origin: "Who this way of thinking comes from"
difficulty: "foundational"
order: "20"
author: "Your name"
---

## Concept

A few paragraphs on the idea.

## Key insight

The one sentence worth remembering.

## Practice prompt

The text a person copies into a chat.

## A small challenge

Something they can try without a model.
```

`difficulty` is `foundational`, `intermediate`, or `advanced`.

## An agent pack

Create `content/packs/<id>/` with `pack.json` and the markdown files the pack needs. `id` inside `pack.json` must match the folder name, because the folder name is the URL.

```json
{
  "id": "my-pack",
  "version": "0.1.0",
  "type": "agent",
  "title": "My pack",
  "summary": "One sentence for the catalog and link preview.",
  "categories": ["operations"],
  "tags": ["agents"],
  "author": "Your name",
  "recommendedModels": ["openai", "anthropic", "gemini"]
}
```

`type` is usually `agent`, `skill`, or `workflow`. Add the folder name to `content/packs/index.json` so it has a stable place in the list. A new folder still appears if the index is behind; the index is for order.

People can copy each file and download the folder as a zip. Put the starter prompt in `PROMPT.md` or `AGENT.md` so the catalog's copy button grabs the right file.

## A daily prompt

This is the file the X posting assistant adds. One prompt, one file. The filename is the date plus the slug. The public URL uses only the slug, so a post can link to `https://mypowerprompts.com/p/improvement-log`.

The page gets a copy button, setup, a check, the source, a Seen on X link, and Open Graph title and description. What's new lists it automatically. Do not also add a What's new note for the same item.

```markdown
---
date: 2026-11-19
title: The Improvement Log
slug: improvement-log
tags: [agent memory, self-improvement]
what_it_does: One sentence for the list and the link preview.
prompt: |
  The text a person copies.
setup: Where to put it.
check_it: How to tell it worked.
source: Paper or post title — https://example.com/source
x_post_url: https://x.com/i/status/123
---
```

Save that as `content/daily/2026-11-19-improvement-log.md`. `date` is `YYYY-MM-DD`. `slug` is lowercase words with hyphens. `tags` can be a YAML list or a comma-separated string. `category` is optional. `x_post_url` must be an `https://x.com` or `https://twitter.com` link. `what_it_does` is the Open Graph description, so write it as one sentence.

Do not rename the slug after the link has been posted.

## A What's new note

```markdown
---
slug: "a-real-daily-pick"
title: "A real daily pick"
date: "2026-11-20"
description: "One sentence that can stand alone in a social post."
author: "Your name"
example: "false"
---

A short note. Say what changed, why it matters, and link a shelf item by its path, like /prompts/morning-command-center.
```

`example: "true"` marks a placeholder. Leave it off for a real note. Do not reuse a slug that has already been posted. Daily prompts do not use this file.

## Review

A review checks that:

- The writing is yours, or you have permission to share it
- There are no secrets, tokens, private emails, or customer data
- The description is honest and the prompt does what it says
- The slug is new, or you are deliberately editing an existing item
- `pnpm test` and `pnpm build` still pass

Small edits to wording are normal in review. You will be asked before a slug changes.

## Local check

```bash
pnpm install
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

Open `pnpm dev` and click the new page. Copy the prompt. Look at the link. That is the whole product.
