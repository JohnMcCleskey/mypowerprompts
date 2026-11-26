---
date: 2026-11-25
title: The Grill Session
slug: grill-session
tags: [decisions, planning, self-improvement]
what_it_does: Before you commit to a plan, your AI interviews you in rounds of numbered questions, offering its own recommended answer to each, and keeps going until every decision is settled and nothing rests on guesswork.
prompt: |
  Grill me on this plan in rounds of numbered questions, each with your recommended answer. Look up facts yourself. Stop when nothing is left assumed: [plan]
setup: "Paste it into any chat assistant (ChatGPT, Claude, Gemini, Grok) or agent, then replace [plan] with the plan, decision, or idea in a few sentences. Answer each round with \"yes\" to accept a recommendation or your own answer. Assistants with web search or file access can look up facts themselves; others will tell you what they need. Coding agents can install the original grilling skill from github.com/mattpocock/skills instead."
check_it: Each round should list numbered questions with a recommended answer under each, later rounds should build on what you already settled, and it should not start acting on the plan until you confirm you both agree.
source: 'Matt Pocock''s open-source agent skills repo, grilling skill (the grill-me skill calls it), https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md ; Archestack rising repos, Nov 2026 (mattpocock/skills at 332.5k stars, +3,958 for Nov 17 to 23 and +29,110 for Oct 25 to Nov 23), https://archestack.com/rising/'
x_post_url: "https://x.com/i/status/2125694237891067947"
---
