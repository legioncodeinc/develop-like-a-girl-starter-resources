# Worked example: Workers protocol readiness evidence

## Stack and scope

The application uses React/Vite and React Router framework SSR on the existing Cloudflare Workers path, with Supabase and optional approved server-to-server integrations. Assess the deployed platform's visitor, edge and upstream boundaries separately. Self-hosted configuration matters only when an existing imported server is explicitly in scope.

The available input is source and a hypothetical redacted response capture. It does not include a live hostname, zone setting, negotiated client protocol, TLS evidence or authorized network test. This assessment is therefore source/readiness review, with native results pending.

## F1: Worker code does not establish visitor protocol

The route returns Fetch Response objects and uses standard HTTP status/header semantics. That source does not identify the visitor-to-edge ALPN result or prove h3 negotiated on a particular request. [Cloudflare HTTP/3 documentation](https://developers.cloudflare.com/speed/optimization/protocol/http3/) describes supported platform behavior, not the unknown application's current setting. Record edge configuration and real client negotiation as separate evidence; changing a setting is a separately authorized owner action.

## F2: An Alt-Svc observation is an advertisement

```http
HTTP/2 200
Alt-Svc: h3=":443"; ma=86400
Cache-Control: public, max-age=60
```

This indicates an advertised alternative, not a successful HTTP/3 exchange. A client can fall back because of capability, policy or network conditions. An absent advertisement in one response also does not rule out other discovery paths or prior cache state. Never manufacture a green readiness result by adding Alt-Svc in Worker source. A public cache directive in this hypothetical capture is appropriate only if the representation is actually public; personal SSR HTML needs its own reviewed policy.

## F3: Legacy sharding needs measurement

Suppose frontend source splits assets across cdn1.example.invalid and cdn2.example.invalid to evade old per-host connection limits. With multiplexed transport that can add connections and reduce reuse. Record each host's ownership, cache policy, bundle splitting and timing before proposing consolidation. Do not delete Vite bundling, useful code splitting, sprites or tiny inlined assets automatically. The hypothesis becomes a performance finding only with the relevant measured effect or accepted budget failure.

## F4: Replay-sensitive effects need actual policy

A POST that creates Checkout sessions or sends mail cannot rely on a claimed h3/0-RTT benefit. PUT and DELETE are idempotent yet unsafe. Review [RFC 8470](https://www.rfc-editor.org/rfc/rfc8470.html), the platform's real early-data policy, replay/deduplication and accepted origin behavior. Do not enable early data or issue a real payment/email request as a test. If replay handling is unknown, report it unknown with Security Review as the follow-up owner.

## Conditional self-hosted comparison

For an explicitly imported nginx/Node configuration, a full assessment would examine installed build/module support, compatible TLS/QUIC implementation, UDP reachability, advertised alternative services, client negotiation and fallback. No old nginx version threshold or language-library support claim is taken as current without primary evidence. A reverse proxy can terminate a protocol independently from the application server. TLS/cipher/certificate and server/network changes belong to their authorized platform owner. These are prerequisites for a different existing deployment, not files or tools the Starter user must have.

## Evidence worksheet

| Question | Current evidence | Result |
|---|---|---|
| Source methods/status/headers compatible? | Read bounded routes and guides | Source-derived expectation only |
| Visitor h2/h3 selected? | No actual client negotiation supplied | NOT RUN / unknown |
| Edge setting enabled for this host? | No owner setting evidence | Unknown |
| Alt-Svc observed? | Hypothetical capture only | Example, not observation |
| Upstream leg protocol? | No upstream transport evidence | Unknown; do not infer from visitor leg |
| CORS/cache/conditional behavior across paths? | Review source; no mounted tests | Native/browser pending |
| Asset consolidation improves budget? | Sharding hypothesis, no timings | Measure before changing |
| 0-RTT replay policy safe for effects? | No actual policy/atomic effects evidence | Security/platform follow-up |

## Concrete authorized follow-up specification

If a capable caller later receives explicit authorization, record the approved public hostname/route, timestamp, client build and supported protocol, negotiated version, fallback result and safe header subset without cookies/tokens/private bodies. A tool claiming an http3 option while built without QUIC support supplies no successful proof. Do not run those commands from this authoring role. Report before/after evidence against the actual candidate and keep settings/configuration effects separately approved.

A good final record demonstrates the negotiated visitor protocol, identifies other unmeasured legs, preserves API/SSR semantics and documents fallback. It does not claim that a header proves TLS or that a Worker source change enabled QUIC. Reference protocols: RFC 9113, RFC 9114, RFC 9000 and RFC 7838.
