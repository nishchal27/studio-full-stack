import type { UnsupportedSection as UnsupportedSectionData } from "@/types/domain";

type UnsupportedSectionProps = {
  section: UnsupportedSectionData;
};

export function UnsupportedSection({ section }: UnsupportedSectionProps) {
  return (
    <section aria-label="Unsupported page section" className="py-8">
      <div className="mx-auto max-w-4xl rounded-md border border-amber-300 bg-amber-50 px-6 py-4 text-sm text-amber-950">
        This section type is not supported yet: <code>{section.type}</code>
      </div>
    </section>
  );
}
