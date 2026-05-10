import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hero Universe",
  description: "Мини-энциклопедия героев, фракций и способностей.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
