import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Food Studio",
  description:
    "Analyze food images, list dish ingredients, generate visuals, and chat in one clean workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
