import type { Metadata } from "next";
import { Syncopate, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "X6 — Zero to Two Hundred",
  description:
    "A scroll-driven cinematic hero: the BMW X6 from standstill to 200 km/h, scrubbed frame by frame as you scroll.",
  authors: [{ name: "Andrew Scotto" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${syncopate.variable} ${spaceMono.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
