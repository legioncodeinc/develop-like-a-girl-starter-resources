# Runtime support evidence

Record the actual runtime pins in `.nvmrc`, `.node-version`, Docker FROM and `.python-version`. A manifest version range or `requires-python` floor is not an exact runtime pin. Missing pins, conflicting pins and unsupported runtime are different claims.

Current support status is UNKNOWN until the owner supplies dated official release/support evidence for the exact runtime. The scanner retains pin detection but disables historical automatic EOL thresholds. Never infer current safety from a bundled date table or demand another backend/runtime for an unrelated project. Compare the observed pin, official end date, observed date and project deployment constraints; cite the evidence and only then assign FND-DEPS-008 severity. An unsupported runtime generally warrants medium; demonstrated reachable impact belongs to Security. No internet verification was performed for this teaching reference.

Use official Node release schedule and Python supported-version documentation when separately authorized research is needed. Record URL, capture date and exact relevant support statement in the actual review. No credentials, installation, upgrade or provider change is implied.

Read [the operating boundaries](../boundaries.md) before interpreting executable examples.
