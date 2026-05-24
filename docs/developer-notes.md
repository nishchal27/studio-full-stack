# Developer Notes

## Architecture Boundaries

Preview is server-owned. It loads Contentful data, normalizes it, validates it, and renders through the shared registry.

Studio is client-owned after initialization. Redux owns editable draft state, localStorage persists drafts, and the Studio preview still renders through the same renderable pipeline.

Publishing is server-owned. The client submits a draft, but validation, SemVer calculation, snapshot creation, and permission checks happen server-side.

## Rendering Pipeline

```txt
Contentful / Redux draft / snapshot
  -> normalizePageData
  -> validatePageData
  -> createRenderablePage
  -> PageRenderer
  -> sectionRegistry
```

The renderer accepts only `RenderablePage`. Raw CMS responses and unvalidated drafts do not reach UI section components.

## Publishing System

Publishing uses pure diff and version functions under `src/lib/semver`.

- Prop or text changes produce patch versions.
- Added sections produce minor versions.
- Removed sections or type changes produce major versions.
- Identical drafts are idempotent and reuse the existing snapshot.

Snapshots are immutable JSON files in `releases/<slug>/<version>.json`.

## RBAC Model

RBAC is intentionally lightweight and mocked for assignment scope. Roles are parsed through `parseUserRole`, enforced by `src/proxy.ts` for Studio access, and enforced by server actions for publishing.

The mocked role source can be replaced by real authentication later without changing renderer, editor, or publish contracts.

## Accessibility

Accessibility is validated with Playwright and axe. The a11y suite checks Preview, Studio, keyboard reachability, and reduced-motion behavior, and generates `a11y-report.json` for CI artifact upload.

## Known Constraints / Tradeoffs

- Release snapshots are local files rather than database records.
- Studio edits are persisted locally and do not write back to Contentful.
- Authentication is mocked to keep the scope focused on authorization boundaries.
- The Contentful model uses JSON section objects, normalized into the internal section contracts.
- Advanced editor behavior such as drag-and-drop and CMS writeback is intentionally out of scope.
