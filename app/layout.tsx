import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI App Cost Estimator",
  description: "Estimate costs and optimize prompts for AI coding tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
