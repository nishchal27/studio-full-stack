# Page Studio

A production-oriented foundation for a schema-driven Page Studio built with Next.js App
Router, TypeScript, Redux Toolkit, Zod, TailwindCSS, shadcn/ui conventions, Playwright,
axe accessibility checks, GitHub Actions, and Vercel deployment support.

## Phase 0 Status

This repository currently implements foundation and architecture only.

Included:

- strict TypeScript Next.js App Router setup
- scalable project structure
- foundational domain types
- Zod page and section schemas
- typed section registry with unsupported fallback support
- isolated Contentful adapter with preview and published client support
- schema-driven preview rendering through `/preview/[slug]`
- shared renderable page pipeline for preview, future drafts, and publish snapshots
- centralized editable field configuration for future studio controls
- Redux Toolkit store, slices, and typed hooks
- studio route placeholder
- accessibility defaults
- Playwright and axe scaffolding
- GitHub Actions CI skeleton
- Vercel configuration

Deferred:

- full Contentful implementation
- schema renderer integration
- advanced editor behavior
- drag and drop
- publishing engine
- RBAC enforcement

## Project Structure

```txt
src/
  app/
  components/
    sections/
    studio/
    shared/
  features/
    editor/
    preview/
    publish/
    auth/
  lib/
    contentful/
    semver/
    validation/
    accessibility/
  registry/
  schemas/
  store/
    slices/
  tests/
  types/
docs/
```

## Local Development

This project is configured for pnpm.

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

## Environment

Copy `.env.example` and provide Contentful values when the adapter is implemented in a
later phase.

## Documentation

- `docs/architecture.md`
- `docs/implementation-plan.md`
- `docs/content-model.md`
- `docs/publishing-flow.md`
- `docs/accessibility.md`
