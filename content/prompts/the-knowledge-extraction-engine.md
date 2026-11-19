---
slug: "the-knowledge-extraction-engine"
id: "ai11"
title: "The Knowledge Extraction Engine"
description: "Pull structured, actionable data from any unstructured text"
category: "ai-programming"
tags: "extraction, data, structured"
set: "3"
author: "Power Prompts"
---

I need to extract structured information from unstructured text — and I need to do it reliably, not approximately. This is one of AI's superpowers when done right.

Source material:
[PASTE YOUR UNSTRUCTURED TEXT — article, transcript, report, email thread, etc.]

Extract the following into clean, structured format:
1. ENTITIES: Every person, company, product, place, and date mentioned — organized in a table
2. CLAIMS: Every factual claim made, with confidence level (verified/unverified/opinion)
3. ACTION ITEMS: Any commitments, tasks, or next steps — with owner if identifiable
4. RELATIONSHIPS: How entities relate to each other (a → works with → b)
5. NUMBERS & METRICS: Every quantitative claim, with context
6. SENTIMENT: Overall tone and sentiment toward key topics
7. GAPS: What information is missing that you'd expect to find?
8. SUMMARY HIERARCHY: One-sentence summary → one-paragraph summary → full structured brief

Output everything in clean markdown tables where possible. Flag anything ambiguous with a ⚠️ symbol.
