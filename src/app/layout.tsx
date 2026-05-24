import type { Metadata } from "next";
import type { ReactNode } from "react";

import { StoreProvider } from "@/store/StoreProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Page Studio",
  description: "Schema-driven page studio foundation.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
