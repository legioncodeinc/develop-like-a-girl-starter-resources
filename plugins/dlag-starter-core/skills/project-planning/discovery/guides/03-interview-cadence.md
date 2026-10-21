# 03 ,  Interview Cadence

Role boundary: prepare requested local Markdown and analyze supplied evidence. The interview/test/recruiting steps below describe a plan for an authorized operator. They do not authorize contact, recording, incentives, automation, publication, credentials, provider setup, application edits or execution. Actual observed results require supplied source evidence; missing tools or approvals stay unrun.

How to run continuous discovery interviews at the weekly frequency Teresa Torres prescribes.

**Research source:** Continuous Discovery Habits Operationalized, GetPerspective (April 2026 secondary synthesis), User interview structure (historical 2026 synthesis)

---

## The weekly cadence

The target is one customer interview per week, conducted by the product trio (PM + designer + engineer). Each interview runs 20-30 minutes and is structured ,  not an open-ended "tell me about yourself" chat.

**Reality check:** The historical secondary synthesis reported fewer than 1 in 5 product trios hit weekly consistently. The primary cause is recruiting friction, not time. See "Recruit while you sleep" below. (Source: Continuous Discovery Habits Operationalized, GetPerspective (April 2026 secondary synthesis))

**Weekly time budget (~100 min/week for the trio):**
- Recruitment / scheduling: ~20 min
- Interview: 30 min
- Debrief + OST update: 30 min
- Async synthesis (individual note review): 20 min

---

## Recruit while you sleep

The most effective recruiting pattern is a standing automated outreach that runs independently of any specific interview need:

1. **Trigger-based invite:** Send an in-app or email invitation to users 24 hours after they complete a key action (e.g., "You just published your first workflow ,  would you share 30 min of feedback?"). If the owner already has an authorized scheduling path, list it; manual scheduling is also valid. No calendar or scheduling provider is selected here.
2. **Ongoing panel:** Maintain a list of 10-20 "always willing to talk" users who've opted in. Rotate through them to avoid oversampling the same voices.
3. **Incentives:** Small gift cards ($25-50) reduce no-shows significantly in B2C. In B2B, framing the call as "we want to learn from your expertise" is often sufficient.

A standing invitation can reduce scheduling work only after the owner chooses and authorizes that mechanism. Starter has no selected background-job or outreach provider; keep automatic triggers as proposals until then.

---

## Interview length and structure

- **20-30 minutes** is the recommended length. Shorter feels rushed; longer risks fatigue and scope creep into design feedback rather than discovery.
- Stick to one opportunity area per interview. Do not try to cover three topics in 30 minutes.
- Use the Five-Act structure from `guides/04-jtbd-interview.md` for the interview body.

---

## Who should be in the room

- The product trio attends together (PM + designer + engineer).
- One person leads; the other two listen and take notes separately.
- Debrief immediately after, while the details are fresh. Each person shares their top insight from the interview before the debrief evolves into interpretation.

---

## Note-taking vs recording

Both are valid; the key discipline is consistency:

- **Recording (preferred):** Record with consent. Generates a verbatim transcript that can be revisited and quoted directly in OST nodes. A separately authorized transcription method may reduce manual work; no tool, account, model/provider call or upload is selected by this plan. Structured manual notes remain available.
- **Note-taking:** Use a structured note template (see `templates/interview-script.md`'s note section) to capture quotes, observations, and emerging opportunity hypotheses in real time.

Never rely solely on memory. The OST update at the end of the week depends on the interview notes; undocumented insights vanish within days.

---

## Synthesis: from interviews to OST

After each interview:

1. **Individual note review:** Each trio member re-reads their notes and identifies 1-3 candidate opportunity nodes (expressed as customer problems/desires, not solutions).
2. **Debrief:** Combine the lists. Cluster duplicates. Debate whether each candidate belongs in the existing tree or opens a new branch.
3. **OST update:** Add, refine, or validate nodes in `library/discovery/opportunity-solution-tree.md`. Note the date and interview context in the node's comment/annotation field.
4. **Saturation signal:** When 5-7 interviews produce no new opportunity nodes for a given cluster, that cluster is saturated and can be considered for solution ideation. (Source: User interview structure (historical 2026 synthesis))
