import type { CtaSection as CtaSectionData } from "@/types/domain";

import { LinkButton } from "@/components/shared/ui/link-button";

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
        <LinkButton className="mt-6" href={section.props.href}>
          {section.props.label}
        </LinkButton>
      </div>
    </section>
  );
}
