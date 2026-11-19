# Power Prompts

A free, open shelf of prompts, thinking frameworks, and agent packs. Copy one into the model you already use. The site is public: no account, no subscription.

The [iOS app](https://apps.apple.com/app/id6760565430) is still there if you want the prompts in your pocket. This repo is the website.

## What is on the shelf

- **120 prompts** you can paste into a chat
- **12 frameworks** for thinking before you ask
- **9 agent packs** as files you can drop into your own stack
- **Daily prompts**, one file per pick, listed in What's new

## Stable links

Every item has one URL. A daily post can point straight at it. Each page sets an Open Graph title, description, and image.

| Thing | URL |
| --- | --- |
| Prompt | `https://mypowerprompts.com/prompts/<slug>` |
| Framework | `https://mypowerprompts.com/frameworks/<slug>` |
| Agent pack | `https://mypowerprompts.com/packs/<id>` |
| Daily prompt | `https://mypowerprompts.com/p/<slug>` |
| What's new note | `https://mypowerprompts.com/whats-new/<slug>` |
| What's new index | `https://mypowerprompts.com/whats-new` |
| Catalog | `https://mypowerprompts.com/catalog` |
| Filtered catalog | `https://mypowerprompts.com/catalog?kind=prompt&category=humor&q=roast` |

Do not rename a slug after it has been shared. Add a new file instead.

A daily prompt is one markdown file, `content/daily/YYYY-MM-DD-slug.md`. The page is `/p/<slug>` (the slug inside the file, not the date). The same entry is listed on What's new. The first one is [The Improvement Log](https://mypowerprompts.com/p/improvement-log).

## Run it

```bash
pnpm install
pnpm dev
```

`pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm test` are the checks.

The app does not need API keys. Copy `.env.example` to `.env.local` only if you want to set the optional public values.

## Say thanks

`NEXT_PUBLIC_DONATION_URL` is an optional link, shown as **Say thanks** in the header and footer. Leave it empty and the button stays hidden. There is no payment code in this repo. Set the variable before `pnpm build` or in the host's build environment; Next inlines `NEXT_PUBLIC_` values at build time.

## Licenses

Code in this repository is [MIT](LICENSE). Prompts, frameworks, agent packs, and What's new notes are [CC BY 4.0](LICENSE-CONTENT). Say who wrote the piece if you pass it on. The `author` field on an item is how credit shows up on the page.

## Contributing

Add a prompt, framework, pack, connector note, or a fun one-off with a pull request. [CONTRIBUTING.md](CONTRIBUTING.md) has the file format. Please read the [code of conduct](CODE_OF_CONDUCT.md) too.
