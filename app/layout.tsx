import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tom Baptist | Apprentice Cyber Security Engineer",
  description: "Cyber security portfolio focused on ICS/OT security, network defence, and practical operational resilience work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
