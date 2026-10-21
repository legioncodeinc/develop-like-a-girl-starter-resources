# Template: Dark Mode Theming Audit Report

*Fill in during a `UI Components Specialist` audit. Replace all `{...}` placeholders.*

---

# Dark Mode Theming Audit: {app-name}

**Date:** {YYYY-MM-DD}
**Branch/commit:** {branch-or-sha}
**Auditor:** UI Components Specialist
**Stack:** {React Router version} | {existing preference strategy} | {Tailwind version}
**Router:** {actual root route path}

---

## Summary scorecard

| Area | Status | Severity of worst finding |
|------|--------|--------------------------|
| Token architecture | {✓ Pass / ⚠ Partial / ✗ Fail} | {High/Medium/Low/None} |
| Preference/provider wiring | {✓ / ⚠ / ✗} | {High/Medium/Low/None} |
| FOWT prevention | {✓ / ⚠ / ✗} | {High/Medium/Low/None} |
| SSR hydration safety | {✓ / ⚠ / ✗} | {High/Medium/Low/None} |
| Tailwind v4 dark mode | {✓ / ⚠ / ✗} | {High/Medium/Low/None} |
| Multi-brand theming | {✓ / ⚠ / N/A} | {High/Medium/Low/None} |

---

## Findings

### HIGH: {finding title}

**Location:** `{file:line}`
**Issue:** {description of the problem}
**Fix:**
```{language}
{before}
```
→
```{language}
{after}
```

---

### MEDIUM: {finding title}

**Location:** `{file:line}`
**Issue:** {description}
**Fix:** {brief fix description or code block}

---

### LOW: {finding title}

**Location:** `{file:line}`
**Issue:** {description}
**Fix:** {brief fix}

---

## Token diff (before / after)

| Token | Before | After | Reason |
|-------|--------|-------|--------|
| `--color-primary` | `#3b82f6` | `var(--primitive-blue-500)` | Move to primitive reference |
| {token} | {before} | {after} | {reason} |

---

## FOWT checklist

- [ ] Root document and existing provider agree on preference authority
- [ ] First client render matches server markup; any narrow suppression justified
- [ ] Transition handling and reduced-motion policy checked
- [ ] `meta[name="color-scheme"]` in `<head>`
- [ ] No raw hex in component files
- [ ] Visual FOWT test passed (CPU throttled hard refresh)

---

## Recommended next steps

1. {action 1}
2. {action 2}
3. {action 3, optional}

---


Use observed / failed / unrun / not applicable consistently. Unchecked runtime behavior is not a pass. Save only when requested in the project documentation location, not the installed Playbook.
