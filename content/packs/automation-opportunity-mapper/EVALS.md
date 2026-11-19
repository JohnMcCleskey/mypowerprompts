# Evals

## Happy-path tests
- The output clearly separates automation-worthy work from manual work.
- The backlog is ranked and implementation-ready.
- The output includes routines, memory guidance, and a confirmation prompt.

## Edge cases
- A workflow has a mix of repetitive and judgment-heavy steps.
- Some steps can be automated only with approval gates.
- The user wants augmentation rather than full automation.

## Failure cases
- The output suggests automation for work that is clearly non-automatable.
- The output ignores approval or compliance constraints.
- The output does not separate automation types or build order.

## Rubric criteria
- Classification accuracy
- Practical value
- Risk handling
- Implementation readiness
- Portability
- Approval awareness
