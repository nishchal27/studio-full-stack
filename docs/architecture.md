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
- Contentful access stays isolated in `src/lib/contentful`.
- Runtime validation stays in `src/schemas` and `src/lib/validation`.
- Editable client state stays in Redux slices under `src/store/slices`.
- Unsupported section types render a fallback instead of crashing.

## Phase 0 Scope

This phase establishes contracts and setup only. Full Contentful mapping, editor controls,
publishing, RBAC enforcement, and renderer error isolation are deferred to later phases.
