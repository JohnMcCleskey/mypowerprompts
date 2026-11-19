# Outputs

## 1. Current situation
- What is happening now
- Where the workflow is slowing down or failing
- What constraints matter

## 2. Findings
- Evidence-backed observations
- Root-cause hypotheses
- Important dependencies or hidden costs

## 3. Opportunity ranking
- Ordered list of improvements by leverage
- Clear rationale for rank order
- Confidence notes where needed

## 4. Impact / effort / risk
- Estimated benefit
- Implementation effort
- Operational or adoption risk

## 5. Recommended next moves
- Immediate actions
- Short-term improvements
- Longer-term structural changes

## 6. Implementation brief
- Owner
- Scope
- Inputs and dependencies
- Validation criteria

## 7. Recurring routines
- Routine name: Weekly bottleneck review
  Purpose: Keep the workflow healthy by spotting regressions and repeated friction early.
  Cadence: Weekly
  Trigger or context: Use after the workflow has been changed or when misses start to reappear.
  Expected inputs: Recent metrics, exception cases, owner notes, and unresolved issues.
  Expected outputs: Updated bottleneck list, confirmed action items, and any escalation needs.
  Why it is valuable: Prevents slow drift and makes recurring issues visible before they compound.
  What memory it should or should not use: Use stable workflow facts and current bottlenecks; do not retain transient one-off incidents unless they repeat.
  Review/confirmation prompt: Review, adjust, and confirm before enabling this as a standing routine.

- Routine name: Monthly process health check
  Purpose: Validate that the process still matches the target outcome and ownership model.
  Cadence: Monthly
  Trigger or context: Use for processes with recurring coordination or high handoff volume.
  Expected inputs: SLA or throughput data, handoff notes, stakeholder feedback, and open risks.
  Expected outputs: Health score, top regressions, and a prioritized fix list.
  Why it is valuable: Catches structural decay and keeps ownership visible.
  What memory it should or should not use: Use only stable process constraints and recurring patterns; avoid storing confidential one-off details.
  Review/confirmation prompt: Review, adjust, and confirm before enabling this as a standing routine.

## 8. Memory guidance
- What to retain for future audits
- What to treat as temporary
- What should be reset or re-evaluated

## 9. Approval / confirmation prompt
- What needs user approval
- What assumptions should be confirmed
- What should be adopted, adjusted, or deferred
- Review, adjust, and confirm before enabling any recurring routine or adopting the changes.
