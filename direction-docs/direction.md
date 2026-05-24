🔥 RECOMMENDED PHASES
🟦 PHASE 0 — FOUNDATION + ARCHITECTURE
Goal

Establish scalable foundations before features.

Deliverables
repo setup
branch strategy
tooling
folder architecture
base types
Zod schemas
section registry skeleton
Contentful adapter contracts
Redux store structure
CI skeleton
engineering docs
Output

By end of Phase 0:

project structure finalized
no architectural confusion later
Codex has strong context
🟦 PHASE 1 — RENDERING + CONTENTFUL
Goal

Build schema-driven rendering engine.

Deliverables
/preview/[slug]
registry rendering
Zod validation
fallback handling
Contentful integration
error boundaries
typed sections

This is the heart of the assignment.

🟦 PHASE 2 — STUDIO + REDUX + RBAC
Goal

Build editing system cleanly.

Deliverables
/studio/[slug]
Redux slices
editing flows
reorder sections
local persistence
RBAC middleware
protected actions
🟦 PHASE 3 — PUBLISH + QUALITY + DELIVERY
Goal

Production engineering quality.

Deliverables
SemVer diff engine
immutable snapshots
changelog generation
Playwright
axe
CI enforcement
accessibility audit
README
recording
deployment
✅ BRANCH STRATEGY (VERY IMPORTANT)

DO NOT commit directly to main.

Use:

main
develop

feature/phase-0-foundation
feature/phase-1-renderer
feature/phase-2-studio
feature/phase-3-publish-quality
✅ COMMIT STRATEGY

Professional commit style:

feat(renderer): implement typed section registry
feat(contentful): add preview/published adapter
feat(editor): add draftPage Redux slice
test(semver): add diff calculation tests
docs(architecture): add renderer flow documentation

This matters psychologically during review.

🔥 MOST IMPORTANT THING

Before ANY coding:

Create:

docs/

Inside:

docs/
├── architecture.md
├── implementation-plan.md
├── content-model.md
├── publishing-flow.md
├── accessibility.md

These docs become:

implementation guidance
AI context grounding
README source
screen recording talking points

This is HUGE.

🎯 PHASE 0 SHOULD PRODUCE
1. Architecture Diagram

Simple but clean.

Example:

Contentful
   ↓
Adapter Layer
   ↓
Schema Validation (Zod)
   ↓
Registry Renderer
   ↓
Preview / Studio
   ↓
Redux Draft State
   ↓
Publish Engine
2. Rendering Flow

Need this documented clearly.

Because registry architecture is core evaluation criteria.

3. State Ownership Rules

VERY IMPORTANT.

Document:

what lives in Redux
what stays server-side
what stays local

This prevents chaos later.

4. Publish SemVer Rules

Document BEFORE implementation.

You want deterministic logic from the start.