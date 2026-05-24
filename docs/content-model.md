# Content Model

## Page

A page has an `id`, `slug`, `title`, `updatedAt`, and ordered `sections`.

## Sections

Supported section types:

- `hero`
- `featureGrid`
- `testimonial`
- `cta`

Section data is represented as a discriminated union keyed by `type`. Unknown CMS section
types are normalized into fallback-safe section data and rendered through `UnsupportedSection`.

Known section types with missing required props fail validation before rendering.

## Editable Fields

Editable fields are centralized in `src/features/editor/config/editableFields.ts`.
The studio should only mutate configured `props.*` fields so editor behavior stays aligned with
renderer and publish contracts.
