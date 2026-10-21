#!/usr/bin/env python3
"""Optional authorized public HEAD/GET collection, or offline redacted capture review.
No collection occurs at import. Stdlib only. Does not write files or follow redirects.
"""
from __future__ import annotations
import argparse
from datetime import datetime, timezone
import http.client
import ipaddress
import json
import os
from pathlib import Path
import re
import socket
import ssl
import stat
import sys
from urllib.parse import urlsplit

MAX_CAPTURE = 1024 * 1024
SAFE_HEADERS = {"strict-transport-security", "content-security-policy", "content-security-policy-report-only", "x-frame-options", "x-content-type-options", "referrer-policy", "cache-control", "content-type", "x-xss-protection", "expect-ct", "cross-origin-resource-policy", "cross-origin-opener-policy", "cross-origin-embedder-policy", "access-control-allow-origin", "access-control-allow-credentials", "permissions-policy", "server", "x-powered-by", "location"}

def public_url(value):
    if not isinstance(value, str) or len(value) > 4096:
        raise ValueError("URL must be a bounded string")
    parts = urlsplit(value)
    if parts.scheme != "https" or not parts.hostname or parts.username or parts.password or parts.query or parts.fragment or parts.port not in (None, 443):
        raise ValueError("requires public HTTPS URL on port443 without credentials, query or fragment")
    if any(ord(c) < 33 or ord(c) > 126 for c in value):
        raise ValueError("URL must use printable ASCII without whitespace")
    return parts

def cookie_attributes(value):
    parts = value.split(";")
    name = parts[0].split("=", 1)[0].strip()
    if not re.fullmatch(r"[!#$%&'*+.^_`|~0-9A-Za-z-]{1,128}", name):
        name = "INVALID_NAME"
    attrs = {}
    for token in parts[1:]:
        key, _, val = token.strip().partition("=")
        key = key.lower()
        if key in {"secure", "httponly", "partitioned"}:
            attrs[key] = True
        elif key == "samesite":
            attrs[key] = val.lower() if val.lower() in {"strict", "lax", "none"} else "invalid"
        elif key in {"path", "domain", "expires", "max-age"}:
            # Even attribute values may carry private paths or identifiers.
            attrs[key + "_present"] = True
    return {"name": name, "value": "REDACTED", "attributes": attrs, "purpose": "requires manual classification"}

def safe_tls(value):
    if not isinstance(value, dict):
        return {"checked": False, "note": "No TLS observation supplied"}
    expiry = value.get("certificate_not_after")
    try:
        parsed = datetime.strptime(expiry, "%b %d %H:%M:%S %Y %Z") if isinstance(expiry, str) and len(expiry) < 40 else None
        expiry = parsed.replace(tzinfo=timezone.utc).isoformat() if parsed else "NOT_OBSERVED"
    except ValueError:
        expiry = "NOT_OBSERVED"
    return {"checked": value.get("checked") is True, "handshake_ok": value.get("handshake_ok") if isinstance(value.get("handshake_ok"), bool) else None, "certificate_not_after": expiry, "note": "Coarse supplied observation only; no independent TLS-depth proof"}

CSP_DIRECTIVES = {"default-src", "script-src", "script-src-elem", "script-src-attr", "style-src", "style-src-elem", "style-src-attr", "img-src", "font-src", "connect-src", "media-src", "object-src", "frame-src", "child-src", "worker-src", "manifest-src", "prefetch-src", "base-uri", "frame-ancestors", "form-action", "sandbox", "report-uri", "report-to", "trusted-types", "require-trusted-types-for", "upgrade-insecure-requests", "block-all-mixed-content", "navigate-to"}
CSP_KEYWORDS = {"'self'", "'none'", "'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'", "'report-sample'", "'unsafe-hashes'", "'wasm-unsafe-eval'", "'inline-speculation-rules'"}

def reference_summary(value):
    """Classify a URI/reference without emitting its path or opaque tokens."""
    try:
        target = urlsplit(value)
        origin = None
        if target.scheme in {"http", "https"} and target.hostname:
            port = target.port
            host = target.hostname
            if ":" in host:
                host = "[" + host + "]"
            origin = target.scheme + "://" + host + ((":" + str(port)) if port else "")
        if origin:
            kind = "absolute-http-reference"
        elif value.startswith("//"):
            kind = "network-path-reference"
        elif target.scheme:
            kind = "other-scheme-reference"
        else:
            kind = "relative-or-opaque-reference"
        return {"kind": kind, "origin": origin, "path_present": bool(target.path), "query_present": bool(target.query), "fragment_present": bool(target.fragment), "details": "REDACTED"}
    except ValueError:
        return {"kind": "invalid-reference", "details": "REDACTED"}

def safe_header(value, header_name=None):
    key = (header_name or "").lower()
    if key == "location":
        return reference_summary(value)
    if key in {"content-security-policy", "content-security-policy-report-only"}:
        directives = []
        for clause in value.split(";"):
            tokens = clause.split()
            if not tokens:
                continue
            name = tokens[0].lower()
            name = name if name in CSP_DIRECTIVES else "UNKNOWN_DIRECTIVE"
            sources = []
            for token in tokens[1:]:
                if token in CSP_KEYWORDS:
                    sources.append({"kind": "keyword", "value": token})
                elif re.match(r"^'?(?:nonce|sha256|sha384|sha512)-", token):
                    sources.append({"kind": "nonce-or-hash", "details": "REDACTED"})
                elif token == "*":
                    sources.append({"kind": "wildcard"})
                else:
                    sources.append(reference_summary(token))
            directives.append({"name": name, "sources": sources})
        return {"kind": "policy-summary", "directives": directives, "details": "Opaque source values and URI paths redacted; review the approved redacted capture for exact policy syntax"}
    # Any absolute URL in other allowlisted headers is reduced to its origin.
    # Without a known header grammar, do not preserve relative/opaque URI data.
    if header_name is None:
        return reference_summary(value)
    def origin_only(match):
        summary = reference_summary(match.group(0))
        return summary.get("origin") or "REDACTED_REFERENCE"
    return re.sub(r"https?://[^\s;'\"]+", origin_only, value)

PRIVATE_COMPONENTS = {".git", ".ssh", ".aws", ".azure", ".config", ".gnupg", ".kube", ".docker", ".wrangler", ".codex", ".claude", "node_modules", "credentials", "credential", "secrets", "secret", "notes", "memory", "memories", "human-notes", "personal-notes"}
PRIVATE_FILENAMES = {".npmrc", ".pypirc", ".netrc", "id_rsa", "id_ed25519", "credentials.json", "credentials.toml", "token.json", "tokens.json", "secrets.json", "service-account.json"}

def permitted_capture_path(path):
    """Refuse known private/credential/human-note paths before opening anything.
    Technical library/knowledge/private remains eligible when explicitly selected.
    """
    absolute = Path(os.path.abspath(path))
    for part in absolute.parts:
        lower = part.lower()
        if lower in PRIVATE_COMPONENTS or lower in PRIVATE_FILENAMES:
            return False
        if lower.startswith((".env", ".dev.vars", "credentials.", "credentials-", "credential.", "secrets.", "secrets-", "service-account.")):
            return False
        if lower.endswith((".pem", ".key", ".p12", ".pfx", ".keystore")):
            return False
    return True

def analyze(capture):
    if not isinstance(capture, dict):
        raise ValueError("capture must be an object")
    parts = public_url(capture.get("url", ""))
    headers = capture.get("headers")
    if not isinstance(headers, list) or len(headers) > 256:
        raise ValueError("headers must be a bounded list of name/value pairs")
    observations, cookies = {}, []
    for pair in headers:
        if not isinstance(pair, list) or len(pair) != 2 or not all(isinstance(v, str) for v in pair):
            raise ValueError("each header must be a string name/value pair")
        key, value = pair[0].lower(), pair[1]
        if len(key) + len(value) > 65536 or any(c in value for c in ("\r", "\n", "\x00")):
            raise ValueError("invalid or oversized header")
        if key == "set-cookie":
            cookies.append(cookie_attributes(value))
        elif key in SAFE_HEADERS:
            # Nonces are tokens too; report their presence without carrying values.
            value = safe_header(value, key)
            observations.setdefault(key, []).append(value)
    return {"origin": "https://" + parts.hostname, "path": "REDACTED", "http_status": capture.get("status") if type(capture.get("status")) is int and 100 <= capture["status"] <= 599 else None, "method_used": capture.get("method") if capture.get("method") in ("HEAD", "GET", "GET (HEAD rejected)") else "unknown", "headers": observations, "cookies": cookies, "coarse_tls_check": safe_tls(capture.get("coarse_tls_check")), "limits": ["Presence is not effectiveness or severity", "Cookie purpose requires manual review", "No browser, cache isolation, protocol/cipher/revocation or payment integrity proof"]}

def read_capture(path):
    if not permitted_capture_path(path):
        raise ValueError("known private, credential, environment or human-note path refused")
    if not all(hasattr(os, name) for name in ("O_DIRECTORY", "O_NOFOLLOW", "O_NONBLOCK")) or os.open not in os.supports_dir_fd:
        raise ValueError("safe file intake requires no-follow directory-descriptor support on this platform")
    absolute = Path(os.path.abspath(path))
    directory = os.open(absolute.anchor, os.O_RDONLY | os.O_DIRECTORY)
    try:
        for part in absolute.parts[1:-1]:
            following = os.open(part, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW, dir_fd=directory)
            os.close(directory)
            directory = following
        fd = os.open(absolute.name, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK, dir_fd=directory)
    finally:
        os.close(directory)
    with os.fdopen(fd, "rb") as stream:
        info = os.fstat(stream.fileno())
        if not stat.S_ISREG(info.st_mode) or info.st_nlink != 1 or info.st_size > MAX_CAPTURE:
            raise ValueError("input must be one regular single-link file of at most1MiB")
        raw = stream.read(MAX_CAPTURE + 1)
        if len(raw) > MAX_CAPTURE:
            raise ValueError("capture exceeds maximum read size")
        return json.loads(raw)

def collect(url):
    parts = public_url(url)
    addresses = socket.getaddrinfo(parts.hostname, 443, type=socket.SOCK_STREAM)
    ips = sorted({address[4][0] for address in addresses})
    if not ips or any(not ipaddress.ip_address(ip).is_global for ip in ips):
        raise ValueError("DNS must resolve only to public global addresses")
    pinned = ips[0]
    context = ssl.create_default_context()
    def connect_pinned(address, timeout=15, source_address=None, **kwargs):
        if address != (parts.hostname, 443):
            raise ValueError("unexpected connection target")
        return socket.create_connection((pinned, 443), timeout, source_address)
    def request(method):
        conn = http.client.HTTPSConnection(parts.hostname, 443, timeout=15, context=context)
        conn._create_connection = connect_pinned
        try:
            conn.request(method, parts.path or "/", headers={"User-Agent": "BuildStudioPublicEvidence/1.0", "Accept": "*/*", "Connection": "close"})
            cert = conn.sock.getpeercert()
            response = conn.getresponse()
            headers = [[k, v] for k, v in response.getheaders()]
            return {"url": url, "status": response.status, "method": method, "headers": headers, "coarse_tls_check": {"checked": True, "handshake_ok": True, "certificate_not_after": cert.get("notAfter"), "note": "Default trust-store verification only; no protocol/cipher/revocation audit"}}
        finally:
            conn.close()
    capture = request("HEAD")
    if capture["status"] in (405, 501):
        capture = request("GET")
        capture["method"] = "GET (HEAD rejected)"
    # Redirects remain observations. No new target is contacted automatically.
    return analyze(capture)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--capture", type=Path)
    source.add_argument("--authorized-public-url", help="Only after the human authorized this exact target/network action")
    args = parser.parse_args()
    try:
        result = analyze(read_capture(args.capture)) if args.capture else collect(args.authorized_public_url)
    except (OSError, ValueError, http.client.HTTPException) as exc:
        # Exceptions can contain header/URL values; never echo raw exceptions.
        print(json.dumps({"status": "INCOMPLETE", "error_type": type(exc).__name__, "detail": "Input rejected or collection failed; no security pass/fail established"}))
        return 2
    print(json.dumps(result, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
