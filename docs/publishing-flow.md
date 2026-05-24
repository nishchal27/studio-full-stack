# Publishing Flow

Publishing creates immutable JSON snapshots from the shared `RenderablePage` contract.

Snapshots are written to `releases/<slug>/<version>.json` by default.

Version rules:

- Patch: text or prop updates.
- Minor: additive structural changes.
- Major: breaking structural changes.

Identical drafts should not create duplicate releases.
