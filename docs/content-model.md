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
types are not trusted as valid domain data and are rendered through the unsupported fallback
when encountered by the registry.
