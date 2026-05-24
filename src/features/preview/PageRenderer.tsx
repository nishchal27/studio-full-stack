import { SectionRenderer } from "@/registry/sectionRegistry";
import type { Page } from "@/types/domain";

type PageRendererProps = {
  page: Page;
};

export function PageRenderer({ page }: PageRendererProps) {
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
