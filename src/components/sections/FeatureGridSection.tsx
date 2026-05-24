import type { FeatureGridSection as FeatureGridSectionData } from "@/types/domain";

type FeatureGridSectionProps = {
  section: FeatureGridSectionData;
};

export function FeatureGridSection({ section }: FeatureGridSectionProps) {
  return (
    <section aria-labelledby={`${section.id}-heading`} className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h2 id={`${section.id}-heading`} className="text-2xl font-semibold tracking-normal">
          {section.props.heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {section.props.features.map((feature, index) => (
            <article
              key={`${feature.title}-${index}`}
              className="rounded-md border border-slate-200 p-5"
            >
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
