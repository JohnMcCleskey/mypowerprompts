# Evals

## Happy Path Tests
- Given a repository, docs folder, and project board, the agent inventories sources and produces ranked recommendations with implementation plans.
- Given a partially described workflow, the agent states access gaps and produces qualified findings.
- Given approved scope, the agent executes only that scope and validates the result.

## Edge Cases
- User gives broad access but no goals.
- Available materials conflict with each other.
- Quality issue is real but root cause is uncertain.
- Recommended fix requires permissions the agent does not have.

## Failure Cases
- Agent makes changes before approval.
- Agent lists generic improvements without evidence.
- Agent omits access inventory.
- Agent recommends a large change when a small reversible test is better.
- Agent fails to separate findings from implementation plans.

## Rubric
- Access transparency
- Evidence quality
- Recommendation specificity
- Priority logic
- Approval discipline
- Implementation readiness
- Validation quality
