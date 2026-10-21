# Explain the tools the project already uses

This guide preserves tool-specific diagnosis without adopting a terminal stack. Inspect supplied project commands and the operator's actual installed version when relevant. No install, shell initialization, aliases, global rc/config file, prompt change or preview execution is part of this method. Historical version/maintenance claims are not current verification.

| Existing tool | Purpose and diagnostic difference | Primary gotcha |
| --- | --- | --- |
| grep / rg | Text matching; flags and output are not universally interchangeable. | rg normally honors ignore rules and omits hidden files; an empty result does not prove absent code. |
| find / fd | File selection; fd syntax/ignore behavior differs from find. | fd normally omits hidden files; some systems use the executable name fdfind. |
| cat / bat | Plain bytes versus highlighted/paged display. | bat output can add display/pager behavior; for script data use the existing plain tool or qualify --plain --no-pager against the installed version. Some systems name it batcat. |
| ls / eza | Directory presentation. | Columns, colors and icons are display output, not a stable file-list parser; icon glyph support is a separate terminal/font concern. |
| cd / zoxide | Direct path transition versus visit-history-based selection. | A missing history match does not establish a missing directory. Use an explicit approved project path for deterministic scripts. |
| fzf | Interactive selection over supplied candidates. | Preview commands spawn processes and may read/execute content; broad previews can expose private files and add cost. It is not a harmless passive list. |

## Search scope before flags

Start with the authorized safe source paths and exclusions. If hidden configuration is relevant, name the exact safe project file or narrow directory rather than recursively searching a home or removing every ignore rule. A --hidden or no-ignore flag changes coverage and can expose credentials, dependency/generated trees and unrelated data. Do not suggest it without a concrete allowed scope and exclusions. Record skipped/generated/ignored/unreadable files as coverage limits; never claim a complete scan from default search behavior.

When reviewing a supplied file-selection recipe, compare the file set before and after any proposed tool replacement. Differences in glob syntax, excludes, symlinks, case matching, output delimiters and filenames with spaces can alter behavior. Do not alias grep to rg, find to fd or cat to bat globally as a project fix. Scripts should name the required existing command deliberately.

## Output and selection boundaries

Use structured/explicit file arguments or an appropriate safe delimiter; do not parse a colored directory listing as filenames. Treat a selected filename as data, not shell text. Substituting a selection into a command string or preview can create another parsing/injection boundary. Do not launch a preview or execute command substitution merely to reproduce it.

Batch tool installs, Bash/Zsh/Fish eval/source initialization, .ripgreprc/bat configuration, fzf previews, prompts/fonts and visit-history customization are outside this project-command method. Their absence here is not a missing prerequisite; retain the existing project environment or return a separate operator task.
