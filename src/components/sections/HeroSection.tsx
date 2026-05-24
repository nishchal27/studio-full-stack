import type { HeroSection as HeroSectionData } from "@/types/domain";

import { LinkButton } from "@/components/shared/ui/link-button";

type HeroSectionProps = {
  section: HeroSectionData;
};

export function HeroSection({ section }: HeroSectionProps) {
  const { eyebrow, heading, body, ctaHref, ctaLabel } = section.props;

  return (
    <section aria-labelledby={`${section.id}-heading`} className="border-b border-slate-200 py-16">
      <div className="mx-auto max-w-5xl px-6">
        {eyebrow ? <p className="text-sm font-medium text-sky-700">{eyebrow}</p> : null}
        <h1
          id={`${section.id}-heading`}
          className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal md:text-5xl"
        >
          {heading}
        </h1>
        {body ? <p className="mt-5 max-w-2xl text-lg text-slate-700">{body}</p> : null}
        {ctaHref && ctaLabel ? (
          <LinkButton className="mt-8" href={ctaHref}>
            {ctaLabel}
          </LinkButton>
        ) : null}
      </div>
    </section>
  );
}
