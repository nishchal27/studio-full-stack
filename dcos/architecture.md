# Architecture Overview

# Objective

The system is designed as a schema-driven page rendering and publishing platform with clear separation between:

- content source
- validation
- rendering
- editing
- publishing
- quality enforcement

The architecture prioritises:
- maintainability
- type safety
- scalability
- isolation of concerns
- predictable state management

---

# High-Level Architecture

```txt
                    ┌─────────────────────┐
                    │     Contentful      │
                    │  Draft / Published  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Adapter Layer      │
                    │ contentfulClient.ts │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Zod Validation     │
                    │   Page Schema       │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │ Preview Route   │       │ Studio Route    │
        │ /preview/[slug] │       │ /studio/[slug]  │
        └────────┬────────┘       └────────┬────────┘
                 │                         │
                 ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │ Section Registry│       │ Redux Toolkit   │
        │ Typed Renderer  │       │ Draft State     │
        └────────┬────────┘       └────────┬────────┘
                 │                         │
                 └────────────┬────────────┘
                              ▼
                    ┌─────────────────────┐
                    │ Publish Engine      │
                    │ SemVer + Snapshots  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Immutable Releases  │
                    │ releases/<slug>/    │
                    └─────────────────────┘
```

---

# Architectural Principles

## 1. Schema-Driven Rendering

Pages are rendered exclusively through validated schemas.

The renderer does not trust Contentful data directly.

All incoming data passes through:
- Zod validation
- section type resolution
- registry lookup

Benefits:
- runtime safety
- predictable rendering
- graceful failure handling
- type-safe rendering contracts

---

# 2. Registry-Based Section Rendering

A central registry controls all renderable sections.

```ts
const sectionRegistry = {
  hero: HeroSection,
  featureGrid: FeatureGridSection,
  testimonial: TestimonialSection,
  cta: CTASection,
}
```

The registry provides:
- exhaustive typing
- isolated section ownership
- scalable section expansion
- fallback rendering support

Unknown sections render:
- UnsupportedSection

instead of crashing the application.

---

# 3. Adapter Isolation

Contentful integration is isolated inside:
- lib/contentful/contentfulClient.ts

UI components and routes never interact directly with Contentful SDKs.

Benefits:
- CMS portability
- environment isolation
- simplified testing
- reduced coupling

The adapter layer handles:
- preview mode
- published mode
- content mapping
- API normalization

---

# 4. Predictable State Management

Redux Toolkit is used only for:
- draft editing state
- studio UI state
- publish flow state

Server-rendered preview data remains server-owned.

Redux slices:
- draftPage
- ui
- publish

Benefits:
- predictable updates
- traceable mutations
- centralized editing logic
- isolated publishing workflows

Direct mutation outside Redux is intentionally avoided.

---

# 5. Separation of Preview and Studio

Preview and Studio serve different architectural purposes.

## Preview Route
Purpose:
- render validated content
- simulate production rendering
- remain mostly server-driven

## Studio Route
Purpose:
- manage editable draft state
- support controlled editing interactions
- orchestrate publishing workflows

This separation reduces:
- accidental state coupling
- rendering complexity
- editor-specific leakage into production rendering

---

# 6. Error Isolation Strategy

The system is designed to fail gracefully.

Failure handling includes:
- Zod validation boundaries
- Error boundaries
- Unsupported section fallbacks
- Safe rendering defaults

Invalid content should never crash the application.

Instead:
- invalid pages surface controlled errors
- unsupported sections render safe fallbacks

---

# 7. Publishing Architecture

Publishing creates immutable releases.

A publish operation:
1. compares current draft against previous release
2. determines SemVer increment
3. generates changelog summary
4. creates immutable snapshot
5. persists release metadata

Snapshots are stored as:
```txt
releases/<slug>/<version>.json
```

Publishing is deterministic and idempotent.

Identical drafts do not generate additional releases.

---

# 8. RBAC Enforcement

Role-based access is enforced server-side.

Roles:
- viewer
- editor
- publisher

Security enforcement occurs through:
- middleware
- protected server actions
- route validation

UI visibility is treated as non-authoritative.

Benefits:
- secure action enforcement
- predictable authorization boundaries
- reduced privilege escalation risk

---

# 9. Accessibility-First Architecture

Accessibility is treated as a system-level concern rather than a post-processing step.

Implementation goals:
- semantic HTML
- keyboard-first interactions
- accessible forms
- visible focus states
- reduced motion support

Accessibility validation is automated through:
- Playwright
- axe-core
- CI enforcement

Critical violations fail the pipeline.

---

# 10. Quality Automation

Quality enforcement is integrated directly into development workflows.

GitHub Actions validates:
- type safety
- linting
- unit tests
- e2e tests
- accessibility checks

Benefits:
- regression prevention
- accessibility enforcement
- deployment confidence

---

# Folder Structure

```txt
src/
├── app/
│
├── components/
│   ├── sections/
│   ├── studio/
│   └── shared/
│
├── features/
│   ├── editor/
│   ├── preview/
│   ├── publish/
│   └── auth/
│
├── lib/
│   ├── contentful/
│   ├── semver/
│   ├── validation/
│   └── accessibility/
│
├── registry/
│
├── schemas/
│
├── store/
│   └── slices/
│
├── tests/
│
└── types/
```

---

# Scalability Considerations

The architecture intentionally supports future expansion.

Potential future capabilities:
- additional section types
- visual page builder
- live collaboration
- multi-environment publishing
- real authentication providers
- visual release diffs
- CMS portability

The registry pattern and adapter isolation reduce future migration complexity.

---

# Trade-offs

## Chosen
- Simpler editor interactions
- Controlled scope
- Deterministic publish logic
- Strong typing and validation

## Deferred
- Advanced drag-and-drop
- Real-time collaboration
- Full visual editor
- Advanced CMS modeling

The implementation intentionally prioritises:
- architectural clarity
- correctness
- maintainability
over feature breadth.