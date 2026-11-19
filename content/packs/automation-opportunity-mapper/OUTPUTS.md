# Outputs

## 1. Current situation
- The workflow or process boundary
- The manual work pattern being mapped
- The current tools, constraints, and approval limits

## 2. Findings
- Repeated tasks and handoffs
- Friction points and failure modes
- Where judgment, approvals, or exceptions matter

## 3. Opportunity ranking
- Ordered automation candidates
- Why each candidate ranks where it does
- Confidence and dependency notes

## 4. Impact / effort / risk
- Expected time saved or quality gain
- Build or integration effort
- Risk, safety, and approval concerns

## 5. Recommended next moves
- What to automate first
- What to augment with assistance
- What to leave manual for now

## 6. Implementation brief
- Candidate design
- Required inputs and outputs
- Owner, dependencies, and validation criteria

## 7. Recurring routines
- Routine name: Weekly automation candidate review
  Purpose: Keep the automation backlog current and sorted by value.
  Cadence: Weekly
  Trigger or context: Use when repeatable work, exceptions, or approvals change.
  Expected inputs: Recent workflow changes, backlog items, and any new failure patterns.
  Expected outputs: Updated candidate ranking, status changes, and follow-up actions.
  Why it is valuable: Prevents stale automation ideas from cluttering the backlog.
  What memory it should or should not use: Use stable workflow facts and classification patterns; do not retain one-off incidents unless they repeat.
  Review/confirmation prompt: Review, adjust, and confirm before enabling this as a standing routine.

- Routine name: Monthly automation health check
  Purpose: Verify that existing automations still match the workflow and approval boundaries.
  Cadence: Monthly
  Trigger or context: Use for live automations or workflows with frequent process changes.
  Expected inputs: Automation outcomes, exceptions, failure rates, and owner feedback.
  Expected outputs: Health score, drift notes, and a list of changes or pauses.
  Why it is valuable: Catches automation drift before it becomes risky.
  What memory it should or should not use: Use stable workflow structure and approval rules; avoid storing unnecessary sensitive details.
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
