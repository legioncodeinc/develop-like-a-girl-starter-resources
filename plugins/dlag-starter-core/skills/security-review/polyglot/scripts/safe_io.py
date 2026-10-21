"""Bounded file-only I/O for optional backend review helpers; standard library only.

No network, subprocess, project imports, credential access or implicit repository
root. Every caller chooses assessed input. New output uses O_EXCL and O_NOFOLLOW.
Designed and built by Legion Code Inc. Licensed under AGPL-3.0-or-later.
"""
from __future__ import annotations
import os
import re
import stat
from pathlib import Path

DENIED_DIRS = {".secrets", ".credentials", ".1password", ".wrangler", ".ssh", ".aws", ".azure", ".config", ".gnupg", ".claude", ".codex", ".cursor", ".agents", ".git", "node_modules", "vendor", "dist", "build", "target", ".venv", "venv", "__pycache__"}
DENIED_NAMES = {".envrc", ".netrc", ".npmrc", ".pypirc", ".pgpass", "id_rsa", "id_ed25519", "credentials.json", "credentials", "master.key", "service-account.json", "service_account.json"}
DENIED_SUFFIXES = {".pem", ".key", ".p12", ".pfx", ".keystore", ".tfstate", ".tfvars", ".sqlite", ".db"}
MAX_FILE_BYTES = 2_000_000
MAX_TOTAL_BYTES = 20_000_000
MAX_FILES = 2000

def sensitive(path: Path) -> bool:
    parts = [p.casefold() for p in path.parts]
    if path.is_absolute() and len(parts) >= 3 and parts[1] == "private" and parts[2] in {"var", "tmp"}:
        parts = parts[2:]  # macOS system temp prefix, not an assessed private/ directory
    if any(p in DENIED_DIRS for p in parts):
        return True
    # Known human documentation paths, not generic src/private or code libraries.
    human_library = {"notes"}
    if any(parts[i] == "library" and parts[i + 1] in human_library for i in range(len(parts) - 1)):
        return True
    if not path.is_absolute() and parts and parts[0] in {"notes", "personal-notes", "private-notes"}:
        return True
    name = path.name.casefold()
    return (name in DENIED_NAMES or name.startswith((".env", ".dev.vars", "credentials", "service-account", "service_account"))
            or path.suffix.casefold() in DENIED_SUFFIXES or name.endswith((".tfstate.backup", ".key.json")))

def scope_root(raw) -> Path:
    raw = Path(raw).absolute()
    if ".." in raw.parts:
        raise ValueError("traversing assessed root refused")
    if raw.is_symlink() or not raw.is_dir():
        raise ValueError("assessed input must be a real directory")
    root = raw.resolve(strict=True)
    # Never accept home, filesystem root or a credential/private/human-note folder.
    if root == Path(root.anchor) or root == Path.home().resolve() or sensitive(root):
        raise ValueError("private or unbounded assessed root refused")
    return root

def contained(root: Path, path: Path) -> bool:
    try:
        relative = path.absolute().relative_to(root)
    except ValueError:
        return False
    if any(p in {"..", "."} for p in relative.parts) or sensitive(relative):
        return False
    current = root
    for part in relative.parts:
        current = current / part
        if current.is_symlink():
            return False
    try:
        return path.resolve().is_relative_to(root)
    except (OSError, RuntimeError):
        return False

def open_directory(path: Path):
    """Open each directory component without following a symlink."""
    path = path.absolute()
    if ".." in path.parts:
        raise ValueError("traversing directory refused")
    fd = os.open(path.anchor, os.O_RDONLY | os.O_DIRECTORY)
    try:
        for part in path.parts[1:]:
            new = os.open(part, os.O_RDONLY | os.O_DIRECTORY | getattr(os, "O_NOFOLLOW", 0), dir_fd=fd)
            os.close(fd)
            fd = new
        return fd
    except BaseException:
        os.close(fd)
        raise


class Budget:
    def __init__(self, root: Path, max_file=MAX_FILE_BYTES):
        if not 1 <= max_file <= MAX_FILE_BYTES:
            raise ValueError("file limit must be 1..2000000 bytes")
        self.root = root
        self.max_file = max_file
        self.bytes = 0
        self.files = 0
        self.caps = set()

    def read(self, path: Path):
        if not contained(self.root, path):
            self.caps.add("private, escaping or symlink input skipped")
            return None
        if self.files >= MAX_FILES or self.bytes >= MAX_TOTAL_BYTES:
            self.caps.add("read budget reached: 2000 files / 20 MB")
            return None
        fd, parent_fd = None, None
        try:
            parent_fd = open_directory(path.absolute().parent)
            fd = os.open(path.name, os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0) | getattr(os, "O_NONBLOCK", 0), dir_fd=parent_fd)
            st = os.fstat(fd)
            if not stat.S_ISREG(st.st_mode) or st.st_nlink != 1:
                self.caps.add("non-regular or hardlinked input skipped")
                return None
            limit = min(self.max_file, MAX_TOTAL_BYTES - self.bytes)
            if st.st_size > limit:
                self.caps.add("file exceeded byte budget")
                return None
            with os.fdopen(fd, "rb") as stream:
                fd = None
                data = stream.read(limit + 1)
            self.files += 1
            self.bytes += len(data)
            if len(data) > limit:
                self.caps.add("file grew beyond bounded read")
                return None
            if b"\x00" in data[:4096]:
                self.caps.add("binary input skipped")
                return None
            return data.decode("utf-8", errors="replace")
        except (OSError, RuntimeError):
            self.caps.add("unreadable or changed input skipped")
            return None
        finally:
            if fd is not None:
                os.close(fd)
            if parent_fd is not None:
                os.close(parent_fd)

def fresh_output(path: Path, input_roots, text: str):
    """Write one new file outside every assessed input, without creating parents."""
    path = path.absolute()
    if ".." in path.parts or sensitive(path):
        raise ValueError("private or traversing output refused")
    parent = path.parent
    if not parent.is_dir():
        raise ValueError("output parent must already exist")
    current = Path(path.anchor)
    for part in parent.parts[1:]:
        current = current / part
        if current.is_symlink():
            raise ValueError("symlink output parent refused")
    resolved_parent = parent.resolve(strict=True)
    for root in input_roots:
        root = Path(root).resolve(strict=True)
        if resolved_parent == root or root in resolved_parent.parents:
            raise ValueError("output inside assessed input refused")
    if path.exists() or path.is_symlink():
        raise ValueError("existing output refused; choose a fresh caller-owned path")
    parent_fd = open_directory(resolved_parent)
    try:
        fd = os.open(path.name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0), 0o600, dir_fd=parent_fd)
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            stream.write(text)
    finally:
        os.close(parent_fd)

def safe_version(value):
    """Never publish manifest URLs, paths, arbitrary specs or token-shaped suffixes."""
    if value is None:
        return None
    value = str(value).strip()
    return value if re.fullmatch(r"\d{1,3}(?:\.\d{1,5}){0,3}(?:-(?:alpha|beta|rc)(?:[.\d]{0,8}))?", value) else None
