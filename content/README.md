# Content

Everything the site shows lives in this folder. A pull request that adds a file here is enough; no database and no deploy secrets.

| Path | Becomes |
| --- | --- |
| `prompts/<slug>.md` | `/prompts/<slug>` |
| `frameworks/<slug>.md` | `/frameworks/<slug>` |
| `packs/<id>/` | `/packs/<id>` |
| `daily/YYYY-MM-DD-slug.md` | `/p/<slug>` and the What's new list |
| `whats-new/<slug>.md` | `/whats-new/<slug>` |

Slugs stay put once they have been shared. See `CONTRIBUTING.md` for the fields each file needs.

`shelf.json` chooses the six items on the home page. `categories.json` names the prompt shelves. `packs/index.json` sets pack order.
