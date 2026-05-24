import type { CtaSection as CtaSectionData } from "@/types/domain";

type CtaSectionProps = {
  section: CtaSectionData;
};

export function CtaSection({ section }: CtaSectionProps) {
  return (
    <section aria-labelledby={`${section.id}-heading`} className="py-12">
      <div className="mx-auto max-w-4xl px-6">
        <h2 id={`${section.id}-heading`} className="text-2xl font-semibold tracking-normal">
          {section.props.heading}
        </h2>
        {section.props.body ? <p className="mt-3 text-slate-700">{section.props.body}</p> : null}
        <a
          className="mt-6 inline-flex font-medium text-sky-700 underline"
          href={section.props.href}
        >
          {section.props.label}
        </a>
      </div>
    </section>
  );
}
