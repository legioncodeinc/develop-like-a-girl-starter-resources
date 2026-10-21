# React Architecture Review: {{project-name}}

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.

**Date:** {{YYYY-MM-DD}}
**Reviewer:** React Foundation Specialist
**Scope:** {{branch / diff / module}}
**Stack:** {{captured from package.json: React X, bundler Y, state libs, data libs, test runner}}

---

## Executive summary

{{2-4 sentence synthesis. Lead with the headline finding. Mention severity counts.}}

## Pillar ratings

Ratings: 🟢 Solid · 🟡 Drifting · 🔴 Needs work

| Pillar | Rating | Headline finding |
|---|---|---|
| Project structure (`guides/01`) | | |
| Components & composition (`02`) | | |
| State management (`03`) | | |
| Data layer (`04`) | | |
| Error handling (`05`) | | |
| Forms (`06`) | | |
| Performance (`07`) | | |
| Testing (`08`) | | |
| TypeScript (`09`) | | |
| React 19 idioms (`10`) | | |
| Server/browser boundaries (`11`) | | |
| Anti-patterns (`12`) | | |

## Findings

### Must-fix ({{count}})

1. **`{{file:line}}`**: {{one-line summary}}
   - Reason: {{citation: guide section or URL}}
   - Fix: {{how}}

2. ...

### Should-refactor ({{count}})

1. **`{{file:line}}`**: ...

### Style ({{count}})

1. **`{{file:line}}`**: ...

## Metrics captured

| Metric | Value | Target | Delta |
|---|---|---|---|
| Explicit emitted static JS entry | {{KB gz}} | {{product-approved budget, if measured}} | |
| LCP (4G) | {{s}} | ≤ 2.5s | |
| INP (p75) | {{ms}} | ≤ 200ms | |
| Test coverage | {{%}} | {{actual project target}} | |
| Test runtime | {{s}} | | |
| Anti-pattern findings | {{count}} | 0 must-fix | |

## Specialist handoffs

- [ ] `Design Foundation`: {{if any visual / token findings}}
- [ ] `Website Builder for website SEO`: {{if any website SEO findings}}
- [ ] `Security Review`: {{if any auth / route action / storage findings}}
- [ ] `Project Notebook`: {{if refactor big enough to warrant a PRD}}
- [ ] `Quality Review`: {{post-fix verification}}

## Recommended next steps

1. {{highest-leverage fix}}
2. {{next}}
3. {{next}}

## References

- `guides/...` ({{list the guides actually cited in findings}})
- [official references](../references/official-sources.md) ({{list the research notes referenced}})
- {{external URLs}}

---

*Produced by react-foundation. See `SKILL.md` for methodology.*
