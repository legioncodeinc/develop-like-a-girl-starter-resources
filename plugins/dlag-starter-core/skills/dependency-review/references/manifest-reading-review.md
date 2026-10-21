# Review the manifest explanation

Compare the [rendered explanation](../examples/read-manifest-fixture.md) with the exact local [manifest](examples/manifest-learning/fixtures/package.json), [lock](examples/manifest-learning/fixtures/package-lock.json) and [fixture limits](examples/manifest-learning/fixtures/README.md).

| Claim | Local locator | Meaning and limit |
|---|---|---|
| F1 | Fixture README, full warning paragraph | Fictional records; no node_modules/CLI/registry/integrity/script or security proof |
| F2 | Manifest dependencies.lesson-widget; lock packages.node_modules/lesson-widget.version/dependencies | Requested ^1.2.0, recorded 1.2.3, transitive lesson-color 0.4.0 |
| F3 | Manifest devDependencies; lock checker dev:true | Development category, not an exemption from security risk |
| F4 | Manifest packageManager, engines and scripts.check | Declared npm/runtime/script; actual CLI and absent check script stay unproved |

Reject: “The manifest pins every installed package, and npm ci fixes the lockfile before testing.” The manifest is a request record, not a complete installed graph. For the matching npm behavior, ci refuses a relevant mismatch and performs installation only when authorized. This fixture runs no install or test.

Check the analogy stops at recorded selection, rather than proving the goods are installed or safe. Ask the reader to identify request versus resolution and the evidence needed for actual check success. Human response and understanding remain pending until received. Use the [qualification worksheet](../templates/example-qualification.md); no historical source receipt supplies a new pass.
