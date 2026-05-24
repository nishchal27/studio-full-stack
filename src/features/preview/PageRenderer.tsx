import { SectionRenderer } from "@/registry/sectionRegistry";
import type { RenderablePage } from "@/types/domain";

type PageRendererProps = {
  page: RenderablePage;
};

export function PageRenderer({ page }: PageRendererProps) {
  // Rendering receives the stable internal page contract only. Server adapters,
  // future Redux drafts, and publish snapshots must normalize and validate first.
  return (
    <article aria-labelledby="page-title">
      <header className="sr-only">
        <h1 id="page-title">{page.title}</h1>
      </header>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </article>
  );
}
