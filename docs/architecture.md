# Architecture

Page Studio is a schema-driven page system with explicit boundaries between content,
validation, rendering, editing, publishing, and quality automation.

```txt
Contentful
  -> Adapter Layer
  -> Zod Validation
  -> Section Registry Renderer
  -> Preview / Studio
  -> Redux Draft State
  -> Publish Engine
```

## Boundaries

- UI components render validated domain objects only.
- Contentful access and CMS field normalization stay isolated in `src/lib/contentful`.
- Runtime validation stays in `src/schemas` and `src/lib/validation`.
- Editable client state stays in Redux slices under `src/store/slices`.
- Unsupported section types render a fallback instead of crashing.

## Rendering Flow

1. The preview route asks the Contentful adapter for a page by slug.
2. The adapter maps SDK entry data into plain page-shaped data.
3. `createRenderablePage` normalizes defaults and validates the page.
4. The page renderer delegates each section to the typed registry.
5. Unknown section types render `UnsupportedSection`.

Malformed known sections stop at the validation boundary and render a controlled preview state.

## Shared Pipeline

`src/lib/validation/createRenderablePage.ts` is the shared entry point for renderable page
creation. Preview rendering uses it today; future Redux drafts and publish snapshots should use
the same pipeline before rendering, diffing, or persistence.

This keeps Contentful pages, editor drafts, and publish artifacts aligned around one internal
`RenderablePage` contract.

## Ownership

Server-owned:

- Contentful fetching
- adapter mapping
- schema validation
- initial preview rendering

Client-owned in later phases:

- editable draft state
- transient UI interactions
- publish workflow state

## Deferred Scope

Editor controls, publishing, drag-and-drop, and advanced auth remain deferred.
