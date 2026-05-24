import Link from "next/link";

import { PageShell } from "@/components/shared/PageShell";

const demoRoutes = [
  {
    title: "Preview",
    description:
      "Schema-driven rendering powered by Contentful, validation, and the shared render pipeline.",
    href: "/preview/home",
  },
  {
    title: "Studio (Editor)",
    description:
      "Editable draft experience with Redux-managed local draft state and live rendering.",
    href: "/studio/home?role=editor",
  },
  {
    title: "Studio (Publisher)",
    description: "Publisher workflow with deterministic SemVer releases and immutable snapshots.",
    href: "/studio/home?role=publisher",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Schema-Driven Page Studio
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
            Production-oriented page rendering, editing, and publishing workflows.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-700">
            A full-stack assignment implementation focused on deterministic rendering, schema
            validation, immutable publishing, accessibility enforcement, and maintainable
            architecture using Next.js, TypeScript, Redux Toolkit, Zod, Playwright, and Contentful.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {demoRoutes.map((route) => (
            <article
              key={route.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-950">{route.title}</h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">{route.description}</p>

              <Link
                href={route.href}
                className="mt-6 inline-flex items-center font-medium text-sky-700 underline"
              >
                Open route
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-20 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Core Engineering Focus</h2>

          <ul className="mt-6 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
            <li>• Shared schema validation and render pipeline</li>
            <li>• Typed registry-based section rendering</li>
            <li>• Contentful CMS integration</li>
            <li>• Redux-managed Studio draft editing</li>
            <li>• Deterministic SemVer publishing</li>
            <li>• Immutable release snapshots</li>
            <li>• Accessibility enforcement with axe + Playwright</li>
            <li>• RBAC-protected publishing workflows</li>
          </ul>
        </section>
      </section>
    </PageShell>
  );
}
