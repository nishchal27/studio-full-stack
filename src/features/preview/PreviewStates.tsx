type PreviewStateProps = {
  title: string;
  message: string;
};

export function PreviewState({ title, message }: PreviewStateProps) {
  return (
    <section aria-labelledby="preview-state-title" className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-sky-700">Preview</p>
      <h1 id="preview-state-title" className="mt-3 text-3xl font-semibold tracking-normal">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-slate-700">{message}</p>
    </section>
  );
}
