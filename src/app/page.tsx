import Link from "next/link";

import { PageShell } from "@/components/shared/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <section aria-labelledby="page-title" className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium text-sky-700">Phase 0 foundation</p>
        <h1 id="page-title" className="mt-3 text-4xl font-semibold tracking-normal">
          Page Studio
        </h1>
        <p className="mt-5 max-w-2xl text-slate-700">
          Foundational architecture is in place for schema validation, section rendering, CMS
          isolation, Redux state, accessibility, testing, and CI.
        </p>
        <nav aria-label="Foundation routes" className="mt-8 flex gap-4">
          <Link className="font-medium text-sky-700 underline" href="/preview/example">
            Preview
          </Link>
          <Link className="font-medium text-sky-700 underline" href="/studio/example">
            Studio
          </Link>
        </nav>
      </section>
    </PageShell>
  );
}
