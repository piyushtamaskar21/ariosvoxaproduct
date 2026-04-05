import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arios Voxa Studio — AI Voice Workforce",
  description: "Deploy intelligent voice agents across every timezone, language, and business function in under 2 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
