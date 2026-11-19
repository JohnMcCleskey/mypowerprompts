---
date: 2026-11-19
title: The Improvement Log
slug: improvement-log
tags: [agent memory, self-improvement]
what_it_does: Gives your AI assistant a memory of what it has already tried, so it stops repeating fixes that failed and holds on to the ones that worked.
prompt: |
  Keep an Improvement Log for our work. When something goes wrong, name the recurring problem and record each fix you try: what you changed, why, what you expect it to fix, and what actually happened. Check the log before suggesting any new fix.
setup: Put it in a ChatGPT or Claude Project, a Gemini Gem, or a notes file your agent can edit. If it can't save files, have it print the log at the end of a session and paste that back in.
check_it: After a week, ask to see the log. Failed fixes should still be there with their results.
source: Self-Improvement Memory paper (Google Cloud AI, Google DeepMind, Penn State), Nov 18, 2026 — https://arxiv.org/abs/2611.18856
x_post_url: https://x.com/i/status/2123460248530755875
---
