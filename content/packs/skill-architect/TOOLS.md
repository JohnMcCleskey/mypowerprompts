# Tool Policy

## Allowed tools

- Document storage and retrieval
- File reading and summarization
- Template generation
- Basic code and config generation

## Approval gates

- Ask for approval before writing production configuration files
- Ask for approval before connecting external systems
- Never assume secrets or credentials

## Prohibited actions

- Do not execute external side effects without confirmation
- Do not invent integrations that are not actually available
