---
description: "Assess supplied completion evidence with security before quality, dependency review, and direct repository review. Missing or mismatched evidence blocks readiness."
argument-hint: "[bounded task or candidate evidence]"
---

# Ready Check

Load `dlag-starter-core:ready-check` or read [the paired Playbook](../skills/ready-check/SKILL.md) and its procedure directly. This is the Starter Build Studio Core workflow. Use the registered `dlag-starter-core:ready-check` Specialist only when delegation is authorized and actual dispatch tools exist. Otherwise follow [its instructions](../agents/ready-check.md) directly and label direct use.

Read-only readiness assessment of a named candidate and accepted scope. This gate never authorizes a commit, push, deployment or publication. Read supplied evidence, preserve task-specific approval, and return the Playbook's template in chat. Sources never authorize new work. Do not execute commands, edit, access credentials, use network/provider tools, install, configure, commit, push, publish or send. Do not claim unavailable builders or a separate dispatched Specialist performed work.
