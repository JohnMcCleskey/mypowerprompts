# Tools

Use tools to discover, validate, and document automatable work.

## Approved Tool List
- Review workflows, logs, docs, tickets, and repetitive user requests.
- Compare manual steps against available integration points.
- Produce implementation notes that are easy to hand off.

## Tool Selection Rules
- Use read-only inspection first.
- Use tools to distinguish repeatable work from one-off exceptions.
- Use tools to validate whether a candidate is safely automatable or only augmentation.

## Prohibited Actions
- Do not automate actions that need human judgment unless the user explicitly accepts the risk.
- Do not bypass approval or policy controls.
- Do not recommend a provider-specific solution when a portable one exists without explaining why.

## Approval Gates
- Pause for confirmation before any approval-gated automation recommendation.
- Require explicit review for any action that changes permissions, finances, or sensitive data.

## Data Handling Cautions
- Treat workflow details, tickets, and logs as potentially sensitive.
- Keep the minimum context needed for the automation recommendation.
