# Example: Secrets Removal from Git History

> Read-only proposal boundary: use supplied local evidence with Read/Grep/Glob/Skill. Every command below is illustrative for a separately authorized caller with the actual tools and exact repository/path/ref scope. This Specialist does not run Git, write files, stage, commit, switch, reset, rewrite, create/remove worktrees, install/configure hooks, access remotes or publish. Before any destructive/history action preserve approved byte/history backups, current full SHAs and rollback steps, confirm active ownership and obtain existing-or-new task-specific authorization. External effects, shared refs, settings, installs and another worker's files have their own explicit scope gates. Never treat the examples as a copy-and-run script.

End-to-end walkthrough: a developer discovers a transactional-email server key was committed to the repo.

---

## Situation

Developer commits a `.env` file containing `RESEND_API_KEY=SYNTHETIC_LEAKED_SECRET` to `main`. The secret has been in history for 3 days.

---

## Step 1: Immediate triage

```bash
# Confirm the secret is in history:
git log --all --full-history -- .env
# Do not print credential-bearing file contents; use an authorized redacted finding reference.
```

**Treat the credential as compromised immediately.** Escalate to `Security Review` for credential rotation in parallel with history cleanup.

---

## Step 2: Backup

```bash
cd /path/to/repo

# Bundle referenced history; separately preserve approved dirty/ignored/untracked bytes:
git bundle create ../repo-backup-$(date +%Y%m%d).bundle --all

# Verify:
git bundle verify ../repo-backup-*.bundle
echo "Backup verified: $(ls -lh ../repo-backup-*.bundle | awk '{print $5}')"
```

---

## Step 3: Remove the secret with git-filter-repo

```bash
# Install git-filter-repo if not present:
pip install git-filter-repo

# Option A: Remove the entire .env file from all history:
git filter-repo --path .env --invert-paths

# Option B: Replace only the secret value (keep the file, redact the value):
cat > ../replace.txt << 'EOF'
SYNTHETIC_LEAKED_SECRET==>REDACTED_SECRET
EOF
git filter-repo --replace-text ../replace.txt
```

After `filter-repo` runs, the remote configuration is removed from the local repo. Verify the secret is gone:

```bash
git log --all --full-history -- .env          # Option A: should return nothing
# An authorized scanner reports only matched paths/refs/counts; never echo the secret value.
# Local absence does not establish hosted-cache or fork cleanup.
```

---

## Step 4: Prepare the approved remote and per-ref updates

```bash
# filter-repo removes the remote - add it back:
git remote add origin https://github.com/org/repo.git

# Force-push all branches:
git push --force-with-lease=refs/heads/feature/example:<expected-old-sha> origin <new-sha>:refs/heads/feature/example

# Force-push tags (they also contain rewritten history):
git push --force-with-lease=refs/tags/example:<expected-old-tag-sha> origin <new-tag-sha>:refs/tags/example
```

---

## Step 5: Team coordination

Illustrative message shape only after verified authorized updates and separate authorization to send it; do not send it from this read-only workflow:

> "We've force-pushed to all branches to remove a leaked secret. Everyone must discard their local clone and re-clone:
>
> `git clone https://github.com/org/repo.git`
>
> Do NOT merge, rebase, or cherry-pick from your old local clone - it contains the old history."

Affected pull requests and collaborators need an explicitly agreed recovery/replacement plan that preserves unique work and avoids reintroducing the exposed history. Do not instruct everyone to discard unbacked work.

---

## Step 6: Credential rotation (escalate to Security Review)

History rewrite does NOT undo the exposure. The credential must be rotated:
1. The explicitly authorized credential custodian revokes the exposed key in its actual provider.
2. Provision a replacement only within the approved response scope.
3. Update server-secret delivery through the approved Cloudflare secrets path and affected systems.
4. Audit relevant access evidence for the exposure window without copying credential values into reports.

This step is `Security Review`'s domain - escalate immediately.

---

## Step 7: Prevention

```bash
# Add .env to .gitignore:
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: add .env to .gitignore"

# Add a pre-commit hook to block secrets (using git-secrets or detect-secrets):
pip install detect-secrets
detect-secrets scan > .secrets.baseline
# Configure in lefthook.yml or .husky/pre-commit
```

---

## Recovery from a bad filter-repo run

If `filter-repo` produced wrong results:

```bash
# Restore from the bundle:
cd /tmp
git clone ../repo-backup-*.bundle restored-repo
cd restored-repo

# Restore the original remote:
git remote set-url origin https://github.com/org/repo.git

# You're back to the pre-filter state. Do not force-push the backup to the remote
# unless you want to undo the rewrite.
```
