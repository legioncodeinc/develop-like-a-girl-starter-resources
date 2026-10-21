#!/usr/bin/env python3
"""Pure bounded version/range/lock-string parsing. No file/network/CLI operations.
Canonical version and ordering mechanisms reuse the local React review helper.
Workspace importer/comparator mechanisms preserve the applicable source methods.
"""
from __future__ import annotations
import json
import re

VER_RE = re.compile(r"^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?")

REDACTED_VERSION = "[non-version reference redacted]"

CANONICAL_VERSION = re.compile(
    r"v?((?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)"
    r"(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?"
    r"(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)"
)

def canonical_version(value) -> str:
    """Only complete bounded SemVer may reach output; Git/tarball/URL references never do."""
    if not isinstance(value, str) or len(value) > 160:
        return REDACTED_VERSION
    match = CANONICAL_VERSION.fullmatch(value)
    return match.group(1) if match else REDACTED_VERSION

def parse_ver(v: str):
    m = VER_RE.fullmatch(canonical_version(v).split("+", 1)[0])
    if not m:
        return None
    pre = m.group(4)
    pre_key = tuple(int(x) if x.isdigit() else x for x in pre.split(".")) if pre else None
    return (int(m.group(1)), int(m.group(2)), int(m.group(3)), pre_key)

def cmp_ver(a, b) -> int:
    if a[:3] != b[:3]:
        return -1 if a[:3] < b[:3] else 1
    pa, pb = a[3], b[3]
    if pa == pb:
        return 0
    if pa is None:
        return 1  # release sorts after its prereleases
    if pb is None:
        return -1
    for x, y in zip(pa, pb):
        if x == y:
            continue
        if isinstance(x, int) and isinstance(y, int):
            return -1 if x < y else 1
        if isinstance(x, int):
            return -1
        if isinstance(y, int):
            return 1
        return -1 if x < y else 1
    return -1 if len(pa) < len(pb) else (1 if len(pa) > len(pb) else 0)

MAX_TEXT = 5_000_000

def text_input(text):
    if not isinstance(text, str) or len(text) > MAX_TEXT:
        raise ValueError("requires a bounded explicit text string")
    return text

def package_name(package):
    if not isinstance(package, str) or not re.fullmatch(r"(?:@[a-z0-9._-]+/)?[a-z0-9._-]{1,160}", package):
        raise ValueError("invalid selected package name")
    return package

def parse_version(value):
    observed = canonical_version(value)
    if observed == REDACTED_VERSION:
        return None
    pre = observed.split("+", 1)[0].partition("-")[2]
    if pre and any(x.isdigit() and len(x) > 1 and x.startswith("0") for x in pre.split(".")):
        return None
    return parse_ver(observed)

def compare(left, right):
    a, b = parse_version(left), parse_version(right)
    return cmp_ver(a, b) if a is not None and b is not None else None

TOKEN = re.compile(r"(>=|<=|>|<|=)?\s*(v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)")

def matches_comparators(version, spec):
    value = parse_version(version)
    if value is None or not isinstance(spec, str) or not spec.strip() or len(spec) > 4000:
        return None
    results = []
    for alternative in spec.split("||"):
        tokens = list(TOKEN.finditer(alternative))
        if not tokens or TOKEN.sub("", alternative).strip(" ,\t\n"):
            return None
        result = True
        for token in tokens:
            operator, raw = token.groups()
            target = parse_version(raw)
            if target is None:
                return None
            c = cmp_ver(value, target)
            result = result and {">=": c >= 0, "<=": c <= 0, ">": c > 0, "<": c < 0, "=": c == 0}[operator or "="]
        results.append(result)
    return any(results)

def valid_versions(values):
    # A malformed or non-version reference is never echoed as a version candidate.
    return sorted({canonical_version(v) for v in values if parse_version(v) is not None})

def npm_versions(text, package, importer=None):
    data = json.loads(text_input(text)); package_name(package)
    if not isinstance(data, dict):
        raise ValueError("npm lock root must be an object")
    candidates = []
    packages = data.get("packages") or {}
    if not isinstance(packages, dict):
        raise ValueError("npm packages must be an object")
    if importer is not None:
        if not isinstance(importer, str) or any(x in importer for x in ("..", "\\", "\x00")) or importer.startswith("/"):
            raise ValueError("invalid importer")
        keys = ([importer.rstrip("/") + "/node_modules/" + package] if importer not in ("", ".") else []) + ["node_modules/" + package]
        for key in keys:
            entry = packages.get(key)
            if isinstance(entry, dict) and entry.get("version"):
                return valid_versions([entry["version"]])
        return []
    for key, entry in packages.items():
        if isinstance(key, str) and key.rsplit("node_modules/", 1)[-1] == package and isinstance(entry, dict):
            candidates.append(entry.get("version"))
    # Legacy npm nested dependency tree; iterative to avoid recursive stack use.
    pending = [(data.get("dependencies") or {}, 0)]
    count = 0
    while pending:
        deps, depth = pending.pop()
        if not isinstance(deps, dict) or depth > 100:
            raise ValueError("invalid or deeply nested dependency object")
        for name, entry in deps.items():
            count += 1
            if count > 100000:
                raise ValueError("dependency count exceeds parser cap")
            if not isinstance(entry, dict):
                continue
            if name == package:
                candidates.append(entry.get("version"))
            if entry.get("dependencies"):
                pending.append((entry["dependencies"], depth + 1))
    return valid_versions(candidates)

def pnpm_versions(text, package, importer=None):
    text_input(text);package_name(package);name=re.escape(package)
    if importer is not None and re.search(r"(?m)^importers:\s*$", text):
        if not isinstance(importer,str) or any(x in importer for x in ("..", "\\", "\x00")) or importer.startswith("/"):
            raise ValueError("invalid importer")
        block=re.search(r"(?ms)^importers:\s*\n(.*?)(?=^\S)",text+"\nEND\n")
        key=importer or "."
        part=re.search(r"(?ms)^  ['\"]?"+re.escape(key)+r"['\"]?:\s*\n(.*?)(?=^  \S|\Z)",block.group(1)) if block else None
        if not part:return []
        match=re.search(r"(?m)^\s+['\"]?"+name+r"['\"]?:\s*\n\s+specifier:[^\n]*\n\s+version:\s*['\"]?([0-9][^\s'\"()]*)",part.group(1))
        match=match or re.search(r"(?m)^\s+['\"]?"+name+r"['\"]?:\s*['\"]?([0-9][^\s'\"()]*)",part.group(1))
        return valid_versions([match.group(1)]) if match else []
    found=re.findall(r"(?m)^\s{2}'?/?"+name+r"[@/]([0-9][^\s:'()_]*)",text)
    return valid_versions(found)

def yarn_versions(text, package):
    text_input(text);package_name(package);out=[];current=False
    for line in text.splitlines():
        if line and not line.startswith((" ","#")):
            current=bool(re.match(r'^"?'+re.escape(package)+r'@',line)) and line.rstrip().endswith(":")
        elif current:
            match=re.fullmatch(r'\s+version:?\s+(?:"([^"\n]*)"|(\S+))\s*',line)
            if match:
                out.append(match.group(1) if match.group(1) is not None else match.group(2));current=False
    return valid_versions(out)

def bun_versions(text, package):
    text_input(text);package_name(package)
    return valid_versions(re.findall(r'"'+re.escape(package)+r'@(\d[^"\s]*)"',text))
