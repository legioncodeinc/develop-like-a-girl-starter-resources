# 07. REST vs RPC

Fielding's constraints, HATEOAS, versioning strategies, and the honest taxonomy of "REST" APIs.

---

## Fielding's constraints (the official definition)

Roy Fielding's 2000 dissertation defines REST as an architectural style with six constraints. There are five required constraints plus optional code on demand; evaluate the required constraints rather than claiming six mandatory rules:

1. **Client-server separation** -- Separate user interface and data-service concerns. This does not forbid client-side business presentation logic or server-rendered HTML.
2. **Stateless** -- Every request contains all information needed to process it. The server does NOT hold session state between requests. Horizontal scaling and transparent caching depend on this.
3. **Cacheable** -- Responses must self-describe whether they are cacheable and for how long. Violation degrades performance and correctness.
4. **Uniform interface** -- The most complex constraint; four sub-constraints:
   - **Resource identification in requests:** resources are identified by URIs; the URI is a stable identifier, not a function name.
   - **Resource manipulation through representations:** clients interact with a resource via its representation (JSON, XML, HTML), not by calling procedures.
   - **Self-descriptive messages:** each message includes enough information to describe how to process it (media type, method, headers).
   - **HATEOAS (Hypermedia As The Engine Of Application State):** the server includes links in responses that describe available next actions. The client does not hardcode URLs; it follows links.
5. **Layered system** -- The client cannot tell whether it is connected to the origin or an intermediary. APIs must not break when a proxy or CDN is in the path.
6. **Code on demand (optional)** -- Servers MAY transfer executable code (JavaScript) to clients.

---

## HATEOAS: the constraint most APIs skip

Most self-described "REST" APIs violate HATEOAS. A HATEOAS response looks like:

```json
{
  "id": 42,
  "status": "processing",
  "_links": {
    "self": { "href": "/orders/42" },
    "cancel": { "href": "/orders/42/cancel", "method": "POST" },
    "track": { "href": "/shipments/xyz" }
  }
}
```

The client follows links; it does not hardcode `/orders/42/cancel`. The server can change its URL structure without breaking clients.

**Practical verdict:** HATEOAS is valuable for long-lived, loosely-coupled clients (web browsers following links). For a tightly coupled server-to-server API, hypermedia costs and benefits depend on its real clients and longevity. This is a legitimate trade-off, but you should name it: "this is an HTTP API, not pure REST."

---

## Honest taxonomy

| Term | What it actually means |
|---|---|
| **REST** | Satisfies the five required constraints, including uniform-interface hypermedia; code on demand is optional. |
| **RESTful** | Informal description of an HTTP resource interface; inspect each architectural constraint rather than assuming compliance or failure. |
| **REST-like / Resource-oriented** | Uses HTTP methods and resource URIs without claiming full Fielding compliance. Honest and appropriate for most APIs. |
| **RPC-over-HTTP** | Uses HTTP transport with procedure-call semantics. A deliberate contract can be appropriate; judge compatibility, safety and observability rather than treating its name as a defect. |
| **GraphQL** | Single endpoint (POST /graphql), query language in the body. Deliberately not REST. Not wrong; just different. |
| **gRPC** | HTTP/2 transport, Protocol Buffers serialization, procedural interface. Not REST. Purpose-built for service-to-service communication. |

---

## URL design principles

**Resources, not actions:**
```
# Procedure-oriented contract (classify honestly)
POST /createUser
GET /getUser?id=42
POST /deleteUser

# Resource-oriented alternative (change only with compatibility acceptance)
POST /users
GET /users/42
DELETE /users/42
```

**Plural nouns for collections:**
```
GET /users          # collection
GET /users/42       # individual resource
POST /users         # create in collection
```

**Sub-resources for relationships:**
```
GET /users/42/orders         # orders belonging to user 42
GET /users/42/orders/7       # specific order of user 42
```

**Avoid verbs in URLs except for actions that don't map to a resource:**
```
POST /orders/42/cancel       # acceptable: "cancel" is an action, not a resource
POST /emails/send            # acceptable: "send" has no obvious resource equivalent
```

---

## Versioning strategies

| Strategy | Example | Trade-offs |
|---|---|---|
| URL path versioning | `/v1/users`, `/v2/users` | Explicit, easy to route; breaks URL stability; duplicates endpoints |
| `Accept` header versioning | `Accept: application/vnd.example.v2+json` | Media-type negotiation; invisible in URLs; requires explicit routing, cache variation and client support |
| Query parameter | `/users?version=2` | Simple; pollutes the query string; caches work correctly |
| Subdomain | `v2.api.example.com` | Clear separation; DNS overhead; complex routing |

**Starter choice:** Preserve the existing accepted versioning strategy. Path, media type, query and host approaches all require explicit routing, cache, deprecation and client compatibility rules. Accept-based versioning is not automatically more REST-compliant. Do not introduce a new version merely to fit a template.

**Key rule:** Never make a breaking change within a version. A "v1 endpoint" must remain backward-compatible for as long as v1 is supported.

---

## Anti-patterns checklist

- [ ] Are verbs used in URLs where resources should be? (`/getUser`, `/createOrder`)
- [ ] Is POST used for all operations regardless of idempotency?
- [ ] Is there a versioning strategy? Is it documented?
- [ ] Are resources named with plural nouns?
- [ ] Does the server retain client application session context needed to interpret later requests? Resource state or a cookie alone is not sufficient evidence of a statelessness violation.
- [ ] Does the API return HATEOAS links? If not: is it honestly called "REST-like" rather than "REST"?

---

## Workers and React Router application boundary

Classify the public HTTP interface separately from internal loader/action calls, Supabase database operations and server-to-server provider requests. A resource-oriented API may intentionally omit hypermedia. Do not retrofit links, change auth session design or rename URLs without accepted compatibility work. Hypermedia links must describe transitions actually available to the current principal, but a link's presence is never authorization to execute it. Each action rechecks identity, object ownership and current state. Nested /users/42/orders/7 paths do not prove ownership; verify both the parent association and actual caller permission.

A JSON _links object is an illustrative representation, not a complete hypermedia standard or proof of REST. GraphQL and gRPC taxonomy remains background context for imported APIs, not a Starter provider/framework selection. Use the [REST worksheet](../templates/rest-checklist.md) to record evidence, partial compliance, deliberate tradeoffs and unknowns. Source: [Fielding chapter 5](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm).
