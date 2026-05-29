import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#efeae0",
};

export const metadata: Metadata = {
  title: "Uri Itai, Ph.D. — Mathematician at work",
  description:
    "The studio of Uri Itai, Ph.D. — a mathematician translating geometry, refinement schemes and statistics into machines that learn. Tel Aviv. Available for consulting and conversation.",
  authors: [{ name: "Uri Itai" }],
  openGraph: {
    title: "Uri Itai, Ph.D.",
    description:
      "Mathematician. Senior Data Scientist. Translating theorems into machines that learn.",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink selection:bg-ink selection:text-paper">
        {children}
      </body>
    </html>
  );
}
