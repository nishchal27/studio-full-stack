import type { UnsupportedSection as UnsupportedSectionData } from "@/types/domain";

type UnsupportedSectionProps = {
  section: UnsupportedSectionData;
};

export function UnsupportedSection({ section }: UnsupportedSectionProps) {
  return (
    <section aria-label="Unsupported page section" className="py-8">
      <div className="mx-auto max-w-4xl border-l-4 border-amber-500 bg-amber-50 px-6 py-4 text-sm text-amber-950">
        Unsupported section type: <code>{section.type}</code>
      </div>
    </section>
  );
}
