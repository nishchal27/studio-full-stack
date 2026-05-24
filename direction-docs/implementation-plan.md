# Implementation Plan

# Goal

Deliver a production-oriented Page Studio within the assignment time constraints while prioritising:

- architectural clarity
- correctness
- maintainability
- accessibility
- automation
- deterministic behaviour

The implementation intentionally focuses on:
- clean system design
- isolated responsibilities
- scalable patterns
over unnecessary feature complexity.

---

# Engineering Strategy

The implementation is divided into four major phases.

The phases are intentionally larger and architecture-oriented to:
- reduce context switching
- maintain implementation momentum
- preserve architectural consistency
- simplify review and debugging

---

# Phase 0 — Foundation & Architecture

## Objective

Establish scalable foundations before feature implementation.

This phase defines:
- project structure
- coding standards
- state boundaries
- rendering architecture
- CI foundations
- implementation contracts

---

## Deliverables

### Project Setup
- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Redux Toolkit
- Zod
- Playwright
- axe-core
- ESLint + Prettier

---

### Folder Architecture
Establish domain-oriented structure:

```txt
src/
├── app/
├── components/
├── features/
├── lib/
├── registry/
├── schemas/
├── store/
├── tests/
└── types/
```

---

### Core Type Definitions
Create foundational types:
- Page
- Section
- SectionType
- PublishVersion
- UserRole

---

### Zod Schema Foundation
Implement:
- page schema
- section schema
- discriminated unions
- runtime validation boundaries

---

### Registry Contracts
Define:
- section registry
- renderer interfaces
- unsupported section fallback strategy

---

### Contentful Adapter Contracts
Define:
- contentfulClient.ts
- draft/published retrieval contracts
- mapping responsibilities

---

### Redux Foundation
Configure:
- Redux store
- slice boundaries
- typed hooks
- persistence strategy

---

### Documentation
Create:
- README
- architecture documentation
- implementation plan
- accessibility notes

---

## Success Criteria

By the end of Phase 0:
- architecture decisions are finalized
- implementation boundaries are clear
- no major structural refactors should be necessary later

---

# Phase 1 — Schema Renderer & Contentful Integration

## Objective

Build the schema-driven rendering pipeline.

This is the architectural core of the assignment.

---

## Deliverables

### Section Registry
Implement:
- typed section registry
- section-to-component mapping
- exhaustive rendering support

---

### Preview Rendering
Implement:
```txt
/preview/[slug]
```

Responsibilities:
- fetch content
- validate schema
- render sections
- isolate rendering failures

---

### Zod Validation Pipeline
All Contentful responses must:
1. pass adapter mapping
2. pass Zod validation
3. render through registry

Invalid content must:
- fail safely
- never crash the application

---

### Unsupported Section Handling
Unknown section types render:
```txt
<UnsupportedSection />
```

instead of throwing runtime errors.

---

### Error Boundary System
Add:
- route-level boundaries
- rendering isolation
- graceful validation failure UI

---

### Contentful Integration
Implement:
- delivery client
- preview client
- environment isolation
- adapter abstraction

No UI layer should directly depend on Contentful SDKs.

---

## Success Criteria

- preview pages render from Contentful
- invalid schemas fail gracefully
- unsupported sections render safely
- registry remains type-safe

---

# Phase 2 — Studio Editor, Redux & RBAC

## Objective

Build the lightweight editing experience and protected workflows.

---

## Deliverables

### Studio Route
Implement:
```txt
/studio/[slug]
```

Capabilities:
- edit draft state
- reorder sections
- add sections
- edit limited props

---

### Redux Slices

## draftPage Slice
Responsibilities:
- editable page state
- section ordering
- prop updates
- persistence synchronization

---

## ui Slice
Responsibilities:
- dialogs
- toasts
- loading states
- local studio interactions

---

## publish Slice
Responsibilities:
- publish status
- changelog preview
- version generation state

---

### Draft Persistence
Persist drafts via:
- localStorage

Goals:
- reload-safe editing
- predictable recovery
- minimal persistence complexity

---

### RBAC Enforcement

Roles:
- viewer
- editor
- publisher

---

### Middleware Enforcement
Protect:
- studio access
- publish actions
- restricted workflows

---

### Server-Side Authorization
Publishing must validate permissions server-side.

UI visibility alone is not trusted for security.

---

## Success Criteria

- draft updates reflect instantly in preview
- Redux owns all editable state
- unauthorized users cannot publish
- viewer role cannot access studio routes

---

# Phase 3 — Publish Engine, Quality Gates & Delivery

## Objective

Implement production-oriented publishing workflows and automated quality enforcement.

---

## Deliverables

### Publish Engine

Publishing flow:
1. compare current draft
2. calculate deterministic SemVer increment
3. generate changelog
4. create immutable snapshot
5. persist release metadata

---

### SemVer Logic

Rules:
- Patch → prop/text updates
- Minor → additive structural changes
- Major → breaking structural changes

Implementation goals:
- deterministic
- testable
- side-effect isolated

---

### Immutable Snapshots

Store releases as:
```txt
releases/<slug>/<version>.json
```

Snapshots must:
- remain immutable
- support historical inspection
- avoid accidental mutation

---

### Idempotent Publishing
Identical drafts should:
- not create duplicate versions
- not create redundant releases

---

### Unit Tests

Coverage:
- schema validation
- version diff logic
- publish calculations

---

### Playwright E2E

Coverage:
- preview rendering
- CTA interaction
- studio flows

---

### Accessibility Automation

Integrate:
- axe-core
- Playwright accessibility checks

Generate:
```txt
a11y-report.json
```

Critical accessibility violations fail CI.

---

### GitHub Actions CI

CI responsibilities:
- install dependencies
- lint
- typecheck
- test
- run Playwright
- run accessibility checks

---

### Accessibility Compliance

Implementation goals:
- keyboard navigation
- visible focus states
- semantic headings
- accessible labels
- reduced motion support

---

### Deployment

Deploy to:
- Vercel

Validate:
- environment variables
- preview routing
- production builds

---

## Success Criteria

- publishing generates immutable releases
- accessibility checks pass
- CI validates successfully
- deployment is production-ready

---

# Git Strategy

## Branches

```txt
main
develop

feature/phase-0-foundation
feature/phase-1-renderer
feature/phase-2-studio
feature/phase-3-publish-quality
```

---

## Commit Convention

Examples:

```bash
feat(renderer): implement typed section registry
feat(editor): add draft persistence flow
feat(publish): implement semver diff engine
test(a11y): add axe smoke validation
docs(architecture): add renderer flow diagrams
```

Goals:
- readable history
- review clarity
- isolated feature tracking

---

# Coding Standards

## General Principles
- strong typing
- explicit boundaries
- isolated business logic
- minimal side effects
- accessibility-first implementation

---

## Avoid
- direct mutation
- CMS leakage into UI
- deeply nested component state
- duplicated validation logic
- implicit runtime assumptions

---

## Prefer
- pure utility functions
- typed contracts
- isolated adapters
- deterministic flows
- graceful fallbacks

---

# AI-Assisted Development Strategy

AI tooling is used to accelerate:
- scaffolding
- repetitive boilerplate
- test generation
- documentation drafting

Human-controlled areas:
- architecture
- system boundaries
- correctness validation
- naming consistency
- final review

AI output is treated as:
- implementation assistance
not
- architectural authority

---

# Risk Management

## Highest Risk Areas
- schema validation edge cases
- publish version determinism
- Redux/editor synchronization
- accessibility regressions

---

## Mitigation Strategy
- implement validation early
- isolate SemVer logic into pure functions
- centralize Redux ownership
- automate accessibility checks

---

# Scope Control

The implementation intentionally avoids:
- advanced drag-and-drop
- real-time collaboration
- complex visual editors
- advanced authentication systems

Priority remains:
- correctness
- maintainability
- architectural clarity
- delivery completeness

---

# Final Deliverables

The final submission includes:

- deployed application
- GitHub repository
- CI workflows
- Playwright tests
- accessibility report
- architecture documentation
- implementation notes
- walkthrough recording