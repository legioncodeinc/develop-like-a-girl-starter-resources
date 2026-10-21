# Official HTTP references and unresolved deployment evidence

Use these direct primary references to support HTTP review. The protocol foundations are stable; browser/platform behavior and installed versions require current primary evidence when relevant. Review date for linked primary pages: 2026-10-21 UTC. This date does not prove a project's native behavior.

## Five reference lanes

1. [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html): application semantics. Use §9 for methods, §15 for status, §8.8 for validators, §13 for conditions and §14 for ranges. The full guides cite specific sections rather than substituting framework conventions.
2. [Fetch CORS protocol](https://fetch.spec.whatwg.org/#http-cors-protocol): exact browser credential/wildcard sharing rules, preflight and exposed-header behavior. Credential mode matters; browser denial alone is not exfiltration evidence.
3. [RFC 9113](https://www.rfc-editor.org/rfc/rfc9113.html), [RFC 9114](https://www.rfc-editor.org/rfc/rfc9114.html), [RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html) and [Cloudflare HTTP/3](https://developers.cloudflare.com/speed/optimization/protocol/http3/): protocol and platform boundaries. Read visitor-to-edge and upstream legs separately. [RFC 8470](https://www.rfc-editor.org/rfc/rfc8470.html) covers HTTP early-data replay considerations; advertising capability is not native proof.
4. [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html): storage/reuse/directives. Vary does not make personal data private. Content negotiation and representation-specific validators must survive the actual selected encoding/edge path. [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) defines optional standard Problem Details, not an automatic breaking response migration.
5. [Fielding chapter 5](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm): client-server, stateless, cacheable, uniform interface, layered system and optional code on demand. Evaluate the actual system before calling it REST, resource-oriented or RPC-over-HTTP.

## Five context decisions

| Decision | Starter handling | Evidence still needed when applicable |
|---|---|---|
| Edge versus self-hosted HTTP/3 | Existing Workers edge path only; self-hosted server knowledge conditional, no proxy selection/install | Actual hostname, approved settings and negotiated client result |
| Problem Details | Available format if compatible with the accepted API; never mandate a response rewrite | Accepted client/body/status contract and safe public fields |
| Hypermedia | Explain strict REST distinction and practical tradeoff; no automatic app rebuild | Actual transition representation and client coupling |
| Push versus preload | Distinguish protocol push from Link preload and Early Hints; do not remove useful build output blindly | Actual browser/platform capability and measured behavior |
| Download disposition | Cover inline/attachment and international filename encoding with Security Review | Object authorization, safe filenames, media type and streaming contract |

## Additional direct authorities

- [RFC 5789 §2](https://www.rfc-editor.org/rfc/rfc5789.html#section-2): patch semantics and atomic application.
- [RFC 6902](https://www.rfc-editor.org/rfc/rfc6902.html) and [RFC 7396](https://www.rfc-editor.org/rfc/rfc7396.html): JSON Patch and Merge Patch formats.
- [RFC 6585 §3-4](https://www.rfc-editor.org/rfc/rfc6585.html#section-3): 428/429; retry metadata is context-specific.
- [RFC 7838](https://www.rfc-editor.org/rfc/rfc7838.html): alternative service advertisements.
- [RFC 6266](https://www.rfc-editor.org/rfc/rfc6266.html) and [RFC 8187](https://www.rfc-editor.org/rfc/rfc8187.html): Content-Disposition and extended parameter encoding.

The guides contain the applicable reasoning, worksheets and worked cases directly. Use the relevant local guide alongside the cited primary authority. Primary references support reasoning; native Workers, SSR, browser, database/R2, provider and transport behavior remain distinct checks, unrun in this packet.
