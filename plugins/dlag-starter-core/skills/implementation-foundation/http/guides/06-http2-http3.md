# 06. HTTP/2 and HTTP/3 readiness

Read [principles](00-principles.md). Starter uses the existing Cloudflare Workers hosting path. This guide reviews compatibility and evidence; it does not choose a proxy, install a server, open UDP ports, change zone settings, enroll a domain, or deploy anything.

## Protocol properties

| Area | HTTP/2 | HTTP/3 |
|---|---|---|
| Transport | Binary framed streams over a TCP connection | HTTP over QUIC, using UDP transport |
| Multiplexing | Concurrent streams avoid HTTP/1.1 application sequencing, but TCP loss can stall them together | Stream-level transport loss isolation improves independence; shared congestion and dependencies still exist |
| Header compression | HPACK | QPACK |
| Handshake/security | Commonly TLS with ALPN h2 | QUIC integrates TLS 1.3; negotiated h3 protocol |
| Mobility | TCP connection continuity depends on transport addressing | QUIC supports connection migration subject to peer/network policy |
| Application semantics | Same core methods/status/representation rules | Same core methods/status/representation rules |

Authority: RFC 9113, RFC 9114 and RFC 9000. Do not promise a fixed compression percentage, latency win or complete absence of head-of-line effects. HTTP/2 and HTTP/3 prohibit some HTTP/1.x connection-specific fields; protocol migration is not permission to forward Connection/Transfer-Encoding headers blindly. The platform handles wire framing; review application headers and streaming compatibility.

## Revisit old optimization assumptions

| Pattern | Original purpose | Review now |
|---|---|---|
| Domain sharding | Work around per-host HTTP/1.1 connection limits | Extra hosts can add handshakes and defeat reuse. Check actual host ownership, caching and timing before consolidating. |
| Large JS/CSS concatenation | Reduce request count | Compare cache invalidation, code splitting, parse cost and request overhead. Bundling remains useful; do not remove Vite bundling because multiplexing exists. |
| Image sprites | Reduce requests | Compare decoding, cache reuse, responsive delivery and accessibility. Not an automatic defect. |
| Asset inlining | Avoid a round trip | Compare transferred bytes, cacheability and critical-path timing; there is no universal ban. |
| Server push | Send anticipated resources | Check actual browser/platform support. Do not confuse Link preload hints or 103 Early Hints with an HTTP/2 PUSH_PROMISE. |

Source presence alone cannot prove a performance regression. Preserve unrelated build choices and measure through a separately authorized caller before changing a working optimization.

## Edge, origin and application are separate legs

Cloudflare's [HTTP/3 documentation](https://developers.cloudflare.com/speed/optimization/protocol/http3/) describes the visitor-to-edge behavior and its conditions. Do not infer it is enabled for an unknown deployment or available to every client. A browser can negotiate h3 to the edge while an upstream service uses another protocol. Worker source Request/Response code does not configure a QUIC listener or prove the protocol of every hop. Header output, Alt-Svc, a screenshot and a dashboard declaration are different evidence classes.

```http
Alt-Svc: h3=":443"; ma=86400
```

This advertises an alternative service (RFC 7838); it is not proof of a successful h3 request, TLS validation or open UDP reachability. Alternatives can also be discovered through other supported mechanisms. Its absence in a single response does not prove h3 unavailable. Do not add Alt-Svc by hand to make a readiness checklist green. A capable authorized caller would record negotiated protocol, hostname, timestamp, client build/capability, route and fallback result, without collecting credentials or private response bodies.

## Early data and replay

0-RTT can be replayed. Safety and idempotency are distinct: PUT and DELETE are idempotent but unsafe, so grouping them as non-idempotent is wrong. Follow the platform's actual early-data policy and [RFC 8470](https://www.rfc-editor.org/rfc/rfc8470.html), including Early-Data and 425 Too Early where applicable. Do not enable early data for a write/payment/mail flow based solely on its method name or an application idempotency key. Review origin acceptance, replay protection, atomic deduplication and intermediary retries together. A source-level If-Match check is not proof of transport replay policy.

## Conditional non-Starter stacks

An imported nginx/Caddy/Envoy/Node server can be assessed conceptually, but installation, proxy choice and self-hosted QUIC configuration are outside the selected Starter path. Inspect supplied server/TLS/build/network evidence only when that existing stack is explicitly in scope. Do not repeat stale version minimums or claim language standard-library support from an old research date. No self-hosted server config is shipped here as a drop-in Workers fix. Request missing owner evidence rather than inventing it.

## Readiness checklist

- [ ] Identify visitor, edge, Worker and upstream boundaries separately.
- [ ] Record source compatibility, advertised capability, negotiated protocol and settings as distinct facts.
- [ ] Review sharding/bundling/sprites/inlining with measurements and accepted design constraints.
- [ ] Preserve method, status, CORS, conditional, cache and streaming semantics across each observed path.
- [ ] Verify actual browser/client capabilities and fallback through an authorized capable caller.
- [ ] Review early-data/replay policy for unsafe effects with Security Review.
- [ ] Leave TLS/cipher/certificate enforcement and live settings changes to their authorized owner.

Use [the complete assessment example](../examples/http3-readiness-assessment.md); no network or native protocol test is implied by reading it.
