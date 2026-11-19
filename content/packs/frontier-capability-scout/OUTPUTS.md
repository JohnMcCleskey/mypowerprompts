# Outputs

## 1. Current situation
- The capability area being scouted
- The user need or adoption goal
- The current provider or ecosystem context

## 2. Findings
- Current capabilities worth attention
- Evidence for availability and maturity
- Important limitations or constraints

## 3. Opportunity ranking
- Ranked list of capabilities by practical value
- Why each item belongs where it does
- Confidence and freshness notes

## 4. Impact / effort / risk
- Expected upside
- Adoption effort
- Risk, maturity, and vendor lock-in considerations

## 5. Recommended next moves
- What to try now
- What to watch
- What to defer

## 6. Implementation brief
- Suggested pilot shape
- Required inputs or access
- Validation steps and success criteria

## 7. Recurring routines
- Routine name: Weekly capability sweep
  Purpose: Keep the scouting view current for fast-moving capabilities.
  Cadence: Weekly
  Trigger or context: Use when the capability area is changing quickly or the user needs fresh awareness.
  Expected inputs: Release notes, docs, changelogs, and recent product announcements.
  Expected outputs: Updated capability ranking, maturity notes, and any portability changes.
  Why it is valuable: Prevents stale assumptions and keeps the recommendation set current.
  What memory it should or should not use: Use only stable provider preferences and prior decisions; do not retain transient hype or unverified claims.
  Review/confirmation prompt: Review, adjust, and confirm before enabling this as a standing routine.

- Routine name: Monthly adoption checkpoint
  Purpose: Decide whether a capability should move from watchlist to pilot or adoption.
  Cadence: Monthly
  Trigger or context: Use when a capability has enough evidence to warrant a decision.
  Expected inputs: Pilot results, source freshness, portability notes, and risk review.
  Expected outputs: Adopt, defer, or discard decision with rationale.
  Why it is valuable: Converts continuous scouting into a concrete decision loop.
  What memory it should or should not use: Use the documented use case, provider constraints, and maturity notes; do not retain stale or confidential strategy details.
  Review/confirmation prompt: Review, adjust, and confirm before enabling this as a standing routine.

## 8. Memory guidance
- What stable context should be retained
- What should expire quickly
- What should be re-verified next time

## 9. Approval / confirmation prompt
- What the user should confirm before adoption
- Which assumptions are still tentative
- Whether to proceed, revise, or pause
- Review, adjust, and confirm before enabling any recurring routine or adopting the changes.
