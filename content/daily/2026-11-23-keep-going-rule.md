---
date: 2026-11-23
title: The Keep Going Rule
slug: keep-going-rule
tags: [agent behavior, ops efficiency, delegation]
what_it_does: Stops your AI assistant from ending every answer with "want me to do that?" so it carries routine work through to the finish, tells you what it assumed, and still checks with you before anything it can't undo.
prompt: |
  Make reasonable, reversible assumptions, state them, and keep going. Stop only if blocked or before anything irreversible.
setup: "Paste it into your assistant's standing instructions: Custom Instructions in ChatGPT, personal preferences or a Project in Claude, a Gem or saved info in Gemini, or your agent's system prompt or rules file. It also works pasted at the top of a single long task."
check_it: Give it a multi-step task with a small gap in the details. It should fill the gap, list its assumptions at the end, and finish, while still asking before it sends, pays for, or deletes anything.
source: 'OpenAI, "Using GPT-6.2" prompting guidance (task completion section), https://developers.openai.com/api/docs/guides/latest-model ; coverage: The Decoder, Nov 21, 2026, https://the-decoder.com/openai-shares-new-prompting-tips-for-gpt-6-2-astra-and-sol-to-fix-brief-answers-and-unnecessary-questions/'
x_post_url: "https://x.com/mccleskey__/status/2125231126662754661"
---
