# Secrets: patterns, history search, and triage

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.


Loaded by [guides/09-secrets-scanning.md](../../guides/09-secrets-scanning.md).

## 1. Pattern catalog for redacted, scoped source evidence

Never run the direct-output search forms below against private files, history or shared transcripts. They define patterns for a redacting capable caller or sanitized supplied evidence. The Specialist uses the local contract's exclusions. Shapes come from gitleaks default rules [primary reference](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml). Python-compatible forms are in `scripts/secrets_fallback.py`.

```bash
# Provider token shapes
$RG -e '\b(AKIA|ASIA|ABIA|ACCA)[A-Z2-7]{16}\b' \
    -e '\bgh[pousr]_[0-9a-zA-Z]{36}\b' -e 'github_pat_\w{82}' -e 'glpat-[\w-]{20}' \
    -e '\b(sk|rk)_(live|prod|test)_[a-zA-Z0-9]{10,99}' -e '\bAIza[\w-]{35}' \
    -e 'sk-(proj|svcacct|admin)-[A-Za-z0-9_-]{20,}' -e 'sk-ant-(api03|admin01)-[A-Za-z0-9_-]{20,}' \
    -e '\bnpm_[A-Za-z0-9]{36}' -e '\bSG\.[A-Za-z0-9_.=-]{66}' -e 'xox[bpe]-[0-9]{10,13}-' \
    -e 'hooks\.slack\.com/(services|workflows|triggers)/' -e 'shpat_[a-fA-F0-9]{32}' \
    -e 'doo_v1_[a-f0-9]{64}' -e 'dp\.pt\.[A-Za-z0-9]{43}' -e 'pypi-AgEIcHlwaS5vcmc'
# Private keys and credentialed URLs
$RG -e '-----BEGIN[ A-Z0-9_-]{0,100}PRIVATE KEY' \
    -e '(postgres(ql)?|mysql|mongodb(\+srv)?|redis|rediss|amqps?)://[^\s:/@]+:[^\s@]{3,}@'
# Assignments with secret-looking names (noisy: read every hit)
$RG -e '(?i)(api[_-]?key|secret|token|passw(or)?d|client[_-]?secret|private[_-]?key)\w*\s*[:=]\s*["\x27][^"\x27\s]{12,}["\x27]'
# Committed env and key files
$RG --files -g '.env' -g '.env.*' -g '!.env.example' -g '!.env.sample' -g '*.pem' -g '*.p12' -g '*.pfx' -g '*.key' -g 'id_rsa*' -g 'credentials.json' -g 'service-account*.json' -g 'config/master.key' -g '*.tfstate' -g '*.tfvars'
```

## 2. History evidence without provider verification

Only a separately authorized capable caller collects history, using an isolated source-only copy or controlled bare repository, hardened Git configuration, no hooks/config execution, no home/credentials, bounded process time/output and explicit source paths. This playbook does not ship a history collector or ask the Specialist to create a clone.

The retained questions are: which sensitive-looking filenames were tracked; which commits added a provider-shaped source literal; whether a sanitized current snapshot still has it; whether a later removal occurred; which refs/commit ranges, rename/binary/large/private paths and uncommitted files were omitted. Avoid author/email/message dumps. Never write full secrets into a raw patch or transcript. A secret removed from HEAD can remain exposed in clone history; owner-authorized rotation addresses credential validity independently of history cleanup.

The optional helper analyzes one caller-sanitized `.patch` containing `COMMIT <hex-id>`, `+++ b/<relative-path>` and added lines. It keeps commit identifiers, scopes paths, rejects traversal/private paths and redacts candidates. It does not infer collection completeness or scan removed/binary lines. If safe collection evidence is unavailable, report history NOT RUN rather than a zero count.

## 3. Triage rules

| Situation | Severity | Confidence |
| --- | --- | --- |
| Live-format provider key (`sk_live_`, `AKIA`, `ghp_`, private key block) in the working tree of a deployed service | `critical` | `likely` (shape plus manual read); never claim active validity from this role; confirmed activity requires separately supplied authorized evidence |
| Same, only in git history (removed from HEAD) | `high`: anyone with clone access still has it; rotation is the fix | `likely` |
| Test-mode key (`sk_test_`, sandbox) | `low` | `likely` |
| Placeholder (`xxxx`, `changeme`, `your-key-here`, `<...>`, `${VAR}`) | not a finding; note in `notes` | |
| Generic assignment hit with no provider shape | `medium` at most until read; drop if it is a variable name, a hash of a public value, or a test fixture | `possible` |
| Committed `.env` with real-looking values | `high` | `likely` |
| Committed `.env` with only placeholders | `low` (hygiene: add to `.gitignore`) | `confirmed` |
| `*.tfstate` committed | `high` only with sanitized supplied evidence of credentials/exposure; do not open private state to verify it | `likely` after reading |

Redaction: evidence keeps the first 4 characters then `****` (contract rule 2). Never put a full secret in any output file, including `raw/`: pass `--redact` to gitleaks, and the fallback script redacts by design [primary reference](https://github.com/gitleaks/gitleaks).

Provider verification is outside this role. Trufflehog verification calls the provider with the secret [primary reference](https://github.com/trufflesecurity/trufflehog). Never perform it here. A separately authorized caller may supply independently redacted evidence; shape alone remains qualified.

The remediation for any real leaked secret is always, in order: rotate or revoke the credential at the provider, remove it from the code and load it from the environment or a secret manager, and then decide with the owner whether to rewrite history (rotation is what actually closes the hole).

Sources: [primary reference](https://github.com/gitleaks/gitleaks), [primary reference](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml), [primary reference](https://github.com/trufflesecurity/trufflehog), [primary reference](https://docs.docker.com/compose/how-tos/use-secrets/)
