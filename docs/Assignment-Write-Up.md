# Technical Write-Up

## Problem Framing

The assignment focused on building a schema-driven page editor and publishing workflow with clear rendering boundaries, safe validation, role-based access control, and deterministic publishing behavior.

The main goal of the implementation was to keep the rendering pipeline predictable and maintainable while supporting:

* CMS-driven content
* local draft editing
* runtime-safe rendering
* immutable publishing
* semantic versioning
* accessibility enforcement

I intentionally treated the project more like a rendering and publishing system than a visual CMS builder. The focus was on architecture consistency, validation, and deterministic workflows rather than advanced editor UX.

---

## Architecture Overview

The application is built around a shared renderable page pipeline.

Content flows through the following stages:

Contentful
→ normalization
→ schema validation
→ renderable page contract
→ registry renderer

The important architectural decision was ensuring that Preview, Studio, and Publish workflows all reuse the same render pipeline instead of maintaining separate rendering systems.

This keeps rendering behavior structurally consistent across:

* CMS preview rendering
* local Studio drafts
* immutable published releases

Section rendering is registry-based. Each section type resolves through a typed registry, and unsupported sections gracefully fall back to a safe runtime component instead of breaking rendering completely.

Validation is handled through Zod schemas before rendering occurs. This prevents malformed CMS data from leaking directly into the UI layer.

---

## Redux Slice Responsibilities

Redux Toolkit is used only for Studio draft ownership and editing behavior.

The Redux layer is intentionally scoped to:

* local draft editing
* section updates
* section ordering
* section insertion/removal
* local draft persistence

The Preview route does not depend on Redux state. Preview rendering always resolves from Contentful through the shared render pipeline.

This separation avoids coupling CMS content with local editor state and keeps ownership boundaries clear.

Studio drafts are persisted locally so editing can survive refreshes without mutating upstream CMS content.

---

## Contentful Model and Adapter

The Contentful model intentionally stays lightweight.

Pages are represented using:

* slug
* title
* sections JSON

instead of deeply nested CMS entry relationships.

This simplified:

* schema validation
* deterministic rendering
* publishing snapshots
* SemVer diffing
* runtime normalization

A dedicated adapter layer isolates Contentful-specific data handling from the renderer contracts.

One issue encountered during implementation was that Contentful sections were being returned as embedded JSON objects rather than linked-entry shapes. This caused valid section types to incorrectly resolve as unsupported sections.

The adapter layer was updated to normalize Contentful responses into stable renderable contracts before validation and rendering. Regression tests were added to ensure valid section types always resolve correctly through the registry.

---

## Publish Workflow and Semantic Versioning

Publishing is implemented as a deterministic release workflow.

The publish pipeline works as:

Draft
→ diff engine
→ semantic version calculation
→ immutable snapshot generation
→ changelog generation

Publishing creates immutable JSON release snapshots under:

releases/<slug>/<version>.json

The publish system intentionally does not mutate Contentful content directly.

Instead, Contentful acts as the upstream content source for Preview hydration, while publishing creates stable release artifacts with:

* version metadata
* changelog entries
* renderable page snapshots

Semantic versioning rules are deterministic:

* PATCH → text/content changes
* MINOR → additive section changes
* MAJOR → destructive or breaking structural changes

Publishing is also idempotent. Re-publishing identical drafts does not create duplicate releases.

---

## RBAC Model

The RBAC implementation intentionally stays lightweight.

The assignment focused on authorization boundaries rather than authentication infrastructure, so the system uses a mocked role/session model with three roles:

* viewer
* editor
* publisher

Permissions are centralized through a shared RBAC layer and enforced through middleware and protected server actions.

Editors can modify drafts but cannot publish releases. Publishers can generate immutable releases.

For walkthrough and testing purposes, lightweight query-param role switching was added without introducing a full authentication system.

---

## Accessibility and Quality Enforcement

Accessibility was treated as part of the implementation workflow rather than post-processing.

The project includes:

* Playwright end-to-end testing
* axe accessibility validation
* CI accessibility enforcement
* automated accessibility reporting

The CI pipeline validates:

* linting
* type safety
* unit tests
* Playwright tests
* accessibility checks
* production builds

Accessibility violations fail CI validation to keep regressions visible during development.

---

## Key Decisions and Trade-Offs

Several implementation decisions were intentionally scoped to match the assignment goals.

### Lightweight Authentication

A full authentication provider was intentionally excluded. The assignment requirements focused on RBAC and protected workflows rather than identity management infrastructure.

The current mocked session layer keeps authorization boundaries testable while remaining replaceable in the future.

### Local Immutable Snapshots

Published releases are stored locally as immutable JSON artifacts instead of being written back into Contentful.

This keeps publishing deterministic, versionable, and isolated from CMS authoring concerns.

### JSON-Driven Sections

Using JSON-driven sections simplified:

* schema validation
* runtime normalization
* release snapshots
* diff generation
* deterministic rendering

This was intentionally preferred over deeply nested CMS relationships for assignment scope.

### Shared Rendering Pipeline

A single shared rendering pipeline was prioritized to avoid inconsistencies between Preview, Studio, and Publish behavior.

This reduced duplication and simplified long-term maintainability.

---

## What Was Not Included

The implementation intentionally does not include:

* full authentication infrastructure
* collaborative editing
* drag-and-drop editing
* CMS writeback publishing
* page management dashboards
* deployment orchestration

These were intentionally excluded to keep the architecture deterministic and maintainable within assignment scope.

The focus remained on:

* rendering correctness
* publishing consistency
* validation safety
* maintainable architecture
* accessibility enforcement
* clear ownership boundaries
