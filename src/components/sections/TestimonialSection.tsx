import type { TestimonialSection as TestimonialSectionData } from "@/types/domain";

type TestimonialSectionProps = {
  section: TestimonialSectionData;
};

export function TestimonialSection({ section }: TestimonialSectionProps) {
  return (
    <section aria-label="Customer testimonial" className="py-12">
      <figure className="mx-auto max-w-3xl px-6">
        <blockquote className="text-xl font-medium tracking-normal">
          <p>{section.props.quote}</p>
        </blockquote>
        <figcaption className="mt-4 text-sm text-slate-700">
          <span className="font-medium text-slate-950">{section.props.authorName}</span>
          {section.props.authorTitle ? <span>, {section.props.authorTitle}</span> : null}
        </figcaption>
      </figure>
    </section>
  );
}
