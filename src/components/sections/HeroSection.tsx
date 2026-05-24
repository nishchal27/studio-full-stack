import type { HeroSection as HeroSectionData } from "@/types/domain";

type HeroSectionProps = {
  section: HeroSectionData;
};

export function HeroSection({ section }: HeroSectionProps) {
  const { eyebrow, heading, body, ctaHref, ctaLabel } = section.props;

  return (
    <section aria-labelledby={`${section.id}-heading`} className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        {eyebrow ? <p className="text-sm font-medium text-sky-700">{eyebrow}</p> : null}
        <h1 id={`${section.id}-heading`} className="mt-3 text-4xl font-semibold tracking-normal">
          {heading}
        </h1>
        {body ? <p className="mt-5 max-w-2xl text-lg text-slate-700">{body}</p> : null}
        {ctaHref && ctaLabel ? (
          <a className="mt-8 inline-flex font-medium text-sky-700 underline" href={ctaHref}>
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
