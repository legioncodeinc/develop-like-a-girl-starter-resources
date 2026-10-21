# Terminal method reference and limits

This reference supports bounded project-command diagnosis. Historical terminal-tool research from November 2025 through May 2026 provides context, not current tool/version/maintenance verification. No terminal stack, prompt, multiplexer or task runner is selected by this method.

## Technical lessons

- Search/display tools differ in ignore rules, hidden-file coverage, filenames, output formatting, paging, history and preview subprocess effects. Explain the actual existing command rather than aliasing or adopting a full stack.
- Bash script review needs actual interpreter/version, argument/quoting boundaries, explicit failure semantics, function scope, getopts, command availability, cleanup ownership and precise signal handling. Shell lint and syntax parsing do not prove runtime safety.
- POSIX shell supports arithmetic expansion and nounset; Bash arrays, [[ and local require the appropriate interpreter. Qualify optional shell features against the actual target. Errexit has contextual exceptions; use explicit status handling for required failure paths.
- A quoted local argument does not establish the safety of a remote shell command string. Follow every parser and data boundary. A supplied comment cannot establish heredoc semantics or a linter pass.
- make's file-dependency semantics differ from just's command recipes. The runner alone does not make a recipe cross-platform. Preserve current tooling, inspect all effects and do not assume listing or a dry-run is a sandbox.
- Prompt, dotfile and multiplexer preferences do not determine whether a project command is correct. Installation, configuration, session persistence and workstation bootstrap are outside this method.

## Primary references for an authorized concrete verification

- GNU Bash Reference Manual: shell expansions, command execution, set options, traps and getopts.
- POSIX Shell Command Language and utilities specifications: arithmetic expansion, parameter expansion, set/test/getopts and signal behavior.
- ShellCheck documentation/wiki: actual diagnostic explanations for a supplied dialect/version.
- Official ripgrep, fd, bat, eza, fzf and zoxide documentation: actual flags/executable names and default behaviors.
- GNU make manual and the just manual: dependency, interpolation, working-directory and evaluation semantics.

These names identify authoritative references, not fresh retrievals. No online research, version/price/maintenance check, native execution, current tool adoption or plugin certification is established by this document. If a concrete unstable feature/version question is required, a capable caller must check the actual installed help and current official documentation within that task's permissions. Missing evidence remains UNKNOWN or NOT_RUN.
