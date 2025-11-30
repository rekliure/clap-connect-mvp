import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLAP Connect (MVP)",
  description: "A learning-first social network (MVP UI)."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
