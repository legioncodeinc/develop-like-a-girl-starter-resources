# Diagnose one supplied project command

Use this sequence for a missing command, a wrong working directory, a portability error or a supplied script review. Do not read home shell configuration, history, credentials, private customer records or unrelated files. A project command can execute arbitrary source: reading its declaration is the first check, not permission to launch it.

## 1. Pin the invocation

Record the exact redacted invocation, current project root/cwd, expected result, actual exit status/output and who supplied that observation. Inspect the relevant package script, existing justfile/Makefile target or script path. State whether invocation came through the package manager, an explicit interpreter, a task runner or CI. Keep command text as data.

Read the shebang and actual invoker. The reported interactive/login shell is supporting context, not proof of the process interpreter. Ask the operator for a narrow version/path observation only when it changes the fix. Never request a full environment dump or command history. A command-not-found error can mean a missing executable, an incorrect cwd, a missing existing dependency installation or a different PATH; do not assume installing a new tool is the answer.

## 2. Inspect the actual failing boundary

| Pattern | Consequence | Scoped proposed correction |
| --- | --- | --- |
| Unquoted ordinary argument expansion | Unexpected splitting/globbing | Quote the expansion; arrays need their element-preserving form. |
| Alias text used as a script dependency | Interactive aliases may not exist in scripts | Use the actual existing executable/script, never install an alias as a fix. |
| source or dot of an unknown path | Executes all file contents; can read credentials/change state | Inspect the safe supplied project file first; report absent/unsafe input rather than source it. |
| Missing explicit cwd | Relative inputs/output go to the wrong place | Derive/validate the approved project path and document invocation context. |
| Failed dependency hidden by redirected errors | False success | Preserve a safe error category/status and stop dependent work. |
| Top-level cd with no failure check | Work may proceed in an unintended directory | Check directory transition and fail before dependent commands. |
| Duplicate setup/PATH/output effects | Repetition changes semantics | Describe the repeated effect; do not edit global startup files. |
| Wrong shell syntax/version | Parse errors or different behavior | Use supported syntax for the actual interpreter or report the missing capability. |

An assignment-only PATH expression is not ordinary command-argument splitting. Review its actual grammar rather than label every unquoted assignment SC2086. An explicit /bin/bash shebang is not automatically wrong when that path/version is the actual project requirement. A guarded source still executes the file; it is not a security boundary.

## 3. Qualify existing tools

Identify the exact executable or package script the project already uses. If an authorized operator supplies command -v output, record its path/version without treating it as execution proof of the requested task. Inspect [existing CLI behavior](02-existing-cli-tools.md) for ignore/format/tool-name differences. Do not initialize fzf, zoxide, Starship or aliases; no new tool adoption occurs here.

## 4. Check safe environment handling

Inspect only named variable uses in the authorized script. Validate required inputs before expansion. Keep missing, empty and intentionally unset states distinct. Never print tokens, raw environment variables, credential-bearing paths or complete private payloads in proposed logs. Secret management belongs to the existing selected Secrets method; a gitignored file is not proof of secure secret handling. Shell history settings, editor preferences and dotfile defaults are outside scope.

## 5. Return evidence and a bounded fix

Use [the complete report](../templates/findings-report.md). State source path/line, actual failure or source-only concern, severity/rationale, precise proposed patch and expected verification. Preserve every unrun check explicitly. Route CI/container/Python/production cases according to [the method boundary](../README.md). No automatic install, shell/default/PATH configuration, task-runner migration or execution follows.
