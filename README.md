# Page Studio — Engineering Sprint Assignment

A schema-driven landing page studio built with Next.js App Router, TypeScript, Redux Toolkit, Contentful, and automated quality gates.

The system enables authorised users to:
- Load landing pages from Contentful
- Edit pages via a lightweight studio
- Preview rendered output
- Publish immutable versioned releases
- Enforce accessibility and quality through CI automation

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Redux Toolkit

## Validation & State
- Zod
- Redux Toolkit

## CMS
- Contentful

## Testing & Quality
- Playwright
- axe-core
- GitHub Actions

## Deployment
- Vercel

---

# Core Features

## Schema-driven Rendering
Pages are rendered through a typed section registry backed by Zod schema validation.

Features:
- Typed section registry
- Fallback handling for unsupported sections
- Runtime schema validation
- Error boundary isolation

---

## Contentful Integration
Contentful integration is isolated behind an adapter layer.

The UI layer has no direct dependency on Contentful APIs.

Supports:
- Draft content
- Published content
- Environment isolation

---

## Studio Editor
The studio provides a lightweight WYSIWYG-style editing experience.

Capabilities:
- Add sections
- Reorder sections
- Edit limited props
- Draft persistence

State management is handled exclusively through Redux Toolkit.

---

## RBAC Enforcement

Roles:
- viewer
- editor
- publisher

Security is enforced server-side through middleware and protected actions.

UI permissions are treated as presentation-only and not trusted for security.

---

## Publish Flow & Versioning

Publishing creates:
- Immutable snapshots
- Semantic versions
- Changelog summaries

Versioning rules:
- Patch → text/prop updates
- Minor → additive structural changes
- Major → breaking structural changes

Publishing is idempotent:
identical drafts do not generate new versions.

---

# Architecture Overview

```txt
Contentful
   ↓
Adapter Layer
   ↓
Zod Validation
   ↓
Section Registry Renderer
   ↓
Preview / Studio
   ↓
Redux Draft State
   ↓
Publish Engine
```

---

# Project Structure

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
```

Detailed architecture documentation is available in:
- docs/architecture.md
- docs/implementation-plan.md

---

# Accessibility

The implementation follows WCAG 2.2 AAA-oriented principles.

Accessibility measures include:
- Full keyboard operability
- Semantic heading hierarchy
- Accessible forms and labels
- Visible focus states
- Reduced motion support
- Automated axe accessibility validation

Accessibility checks are enforced in CI.

---

# Testing

## Unit Tests
- Schema validation
- SemVer diff logic

## E2E Tests
- Preview rendering
- CTA interaction
- Accessibility validation

---

# CI/CD

GitHub Actions validates:
- Linting
- Type safety
- Tests
- Accessibility checks

Critical accessibility violations fail CI.

---

# Local Development

## Install dependencies

```bash
pnpm install
```

## Run development server

```bash
pnpm dev
```

## Run tests

```bash
pnpm test
```

## Run Playwright

```bash
pnpm playwright
```

---

# Assumptions & Trade-offs

- Authentication is intentionally simplified to focus on RBAC architecture.
- Contentful models are intentionally minimal for implementation speed.
- The editor is intentionally lightweight and focused on required functionality.
- Accessibility and maintainability were prioritised over advanced UI polish.

---

# Future Improvements

Potential enhancements:
- Real authentication provider integration
- Drag-and-drop section ordering
- Visual diff publishing
- Live collaborative editing
- Incremental static regeneration support
- Advanced Contentful modelling

---

# Deployment

The application is designed for deployment on Vercel.

Environment variables required:
- Contentful Space ID
- Contentful Delivery Token
- Contentful Preview Token

---

# Deliverables

- Live deployed application
- GitHub repository
- CI workflows
- Accessibility reports
- Architecture documentation
- Screen recording walkthrough