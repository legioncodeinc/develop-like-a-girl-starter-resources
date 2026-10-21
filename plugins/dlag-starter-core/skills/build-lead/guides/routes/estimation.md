# Estimation routing

Use **Project Planning** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
This Specialist is the authority on software estimation and probabilistic delivery forecasting: relative-sizing frameworks (Fibonacci story points, T-shirt sizing, Planning Poker), the NoEstimates movement and its evidence base, the planning-fallacy literature explaining why estimates run systematically optimistic, and cycle-time or throughput-based forecasting including Monte Carlo simulation with percentile-based delivery dates. It treats estimation as a communication and risk-management tool, not a commitment generator.


## Trigger phrases
- "our story points mean nothing"
- "should we use NoEstimates?"
- "how do I T-shirt size our roadmap?"
- "we need a 90% confidence delivery date"
- "explain Monte Carlo to my PM"
- "why are our estimates always wrong"
- "run a Planning Poker session"

## Do NOT route when
- The ask is configuring Jira velocity boards, Linear cycle-time charts, or Azure DevOps burn-down views: that's the team's tooling owner, not this Specialist. This Specialist provides the technique, not the tool configuration.
- The ask is designing or running sprint ceremonies (planning, retro, standup): that's an agile coach or Project Notebook for the retrospective PRD format.
- The ask is team-capacity planning or headcount math: outside estimation, flag and stop rather than improvise.
- A team with zero historical data wants to abandon estimation entirely: this Specialist explains why that produces zero visibility and recommends building cycle-time history first, it does not simply say yes.

## Inputs the Specialist needs
- Whether the team has 6+ months of reliable cycle-time data (gates NoEstimates and throughput forecasting)
- The diagnosed root cause of the estimation dysfunction, from the five-category framework
- Whether the ask is relative sizing, a confidence-interval delivery date, or an explanation of why estimates are wrong
- Backlog item count and throughput samples, if Monte Carlo forecasting is in scope

## Outputs
- A written advisory: diagnosed root cause, recommended approach, implementation steps, one anti-pattern warning
- A worked Fibonacci or T-shirt sizing session, or a Monte Carlo forecast with P50/P85/P95 output
- An explanation of the planning-fallacy literature grounding the recommendation

## Commonly sequenced with
- Project Notebook: authors the roadmap or retrospective PRD once this Specialist's estimation approach is set
- product-management sprint-planning workflows: consumes this Specialist's sizing output to build sprint scope

## Total build-budget trigger

For a build budget, reuse the established delivery forecast and require dated quantities, rates, currency and assumptions. Separate build time, recurring holding costs, paid contractor/assets and a nonoverlapping first operating period. Unknown amounts remain gaps; owner-time value stays separate. A complete operating-cost, commercial-quote or unit-economics workflow is unavailable. No account access, purchase, price-setting, provider action or AI-productivity multiplier follows from a worksheet.
