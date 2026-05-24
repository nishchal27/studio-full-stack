```markdown
. 📂 studio-full-stack
├── 📄 README.md
├── 📄 components.json
└── 📂 direction-docs/
│  ├── 📄 architecture.md
│  ├── 📄 direction.md
│  ├── 📄 implementation-plan.md
└── 📂 docs/
│  ├── 📄 accessibility.md
│  ├── 📄 architecture.md
│  ├── 📄 content-model.md
│  ├── 📄 implementation-plan.md
│  ├── 📄 publishing-flow.md
├── 📄 eslint.config.mjs
├── 📄 next-env.d.ts
├── 📄 next.config.ts
├── 📄 package.json
├── 📄 playwright.config.ts
├── 📄 pnpm-lock.yaml
├── 📄 postcss.config.mjs
├── 📄 prettier.config.mjs
└── 📂 src/
│  └── 📂 app/
│    ├── 📄 globals.css
│    ├── 📄 layout.tsx
│    ├── 📄 page.tsx
│    └── 📂 preview/
│      └── 📂 [slug]/
│        ├── 📄 error.tsx
│        ├── 📄 loading.tsx
│        ├── 📄 page.tsx
│    └── 📂 studio/
│      └── 📂 [slug]/
│        ├── 📄 page.tsx
│  └── 📂 components/
│    └── 📂 sections/
│      ├── 📄 CtaSection.tsx
│      ├── 📄 FeatureGridSection.tsx
│      ├── 📄 HeroSection.tsx
│      ├── 📄 TestimonialSection.tsx
│      ├── 📄 UnsupportedSection.tsx
│    └── 📂 shared/
│      ├── 📄 PageShell.tsx
│      └── 📂 ui/
│        ├── 📄 button.tsx
│        ├── 📄 link-button.tsx
│    └── 📂 studio/
│      ├── 📄 AddSectionControls.tsx
│      ├── 📄 EditorField.tsx
│      ├── 📄 SectionControls.tsx
│  └── 📂 features/
│    └── 📂 auth/
│      ├── 📄 rbac.ts
│      ├── 📄 serverSession.ts
│    └── 📂 editor/
│      ├── 📄 StudioEditor.tsx
│      └── 📂 config/
│        ├── 📄 editableFields.ts
│      └── 📂 lib/
│        ├── 📄 createDraftPage.ts
│        ├── 📄 draftPersistence.ts
│        ├── 📄 loadStudioDraft.ts
│    └── 📂 preview/
│      ├── 📄 PageRenderer.tsx
│      ├── 📄 PreviewStates.tsx
│    └── 📂 publish/
│      ├── 📄 actions.ts
│  └── 📂 lib/
│    └── 📂 accessibility/
│      ├── 📄 focus.ts
│    └── 📂 contentful/
│      ├── 📄 contentfulClient.ts
│    └── 📂 semver/
│    ├── 📄 utils.ts
│    └── 📂 validation/
│      ├── 📄 createRenderablePage.ts
│      ├── 📄 normalizePageData.ts
│      ├── 📄 safeParse.ts
│      ├── 📄 sectionDefaults.ts
│      ├── 📄 validatePageData.ts
│  ├── 📄 proxy.ts
│  └── 📂 registry/
│    ├── 📄 sectionRegistry.ts
│  └── 📂 schemas/
│    ├── 📄 page.schema.ts
│    ├── 📄 section.schema.ts
│  └── 📂 store/
│    ├── 📄 StoreProvider.tsx
│    ├── 📄 hooks.ts
│    └── 📂 slices/
│      ├── 📄 draftPageSlice.ts
│      ├── 📄 publishSlice.ts
│      ├── 📄 uiSlice.ts
│    ├── 📄 store.ts
│  └── 📂 tests/
│    └── 📂 accessibility/
│      ├── 📄 a11y.spec.ts
│    ├── 📄 draftPageSlice.test.ts
│    ├── 📄 draftPersistence.test.ts
│    └── 📂 e2e/
│      ├── 📄 routes.spec.ts
│    ├── 📄 editableFields.test.ts
│    └── 📂 factories/
│      ├── 📄 contentful.ts
│      ├── 📄 pages.ts
│      ├── 📄 sections.ts
│    ├── 📄 page.schema.test.ts
│    ├── 📄 rbac.test.ts
│    ├── 📄 renderablePage.test.ts
│    ├── 📄 sectionRegistry.test.tsx
│  └── 📂 types/
│    ├── 📄 contentful.ts
│    ├── 📄 domain.ts
└── 📂 test-results/
├── 📄 tsconfig.json
├── 📄 vercel.json
└── 📄 vitest.config.ts
```