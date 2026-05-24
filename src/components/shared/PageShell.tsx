import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-dvh bg-white text-slate-950">
      <main>{children}</main>
    </div>
  );
}
