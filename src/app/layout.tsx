import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaswantj-portfolio.vercel.app"),
  title: "Jaswant Jayacumaar · Data Analyst · Analytics Platforms & Marketing Automation",
  description:
    "Data analyst in London building the analytics platforms, automated bidding systems and AI agents behind a global e-commerce business: BigQuery, Google Ads API, LangGraph, Next.js.",
  openGraph: {
    title: "Jaswant Jayacumaar · Data Analyst",
    description:
      "Analytics platforms, marketing automation and production LLM tooling for global e-commerce.",
    url: "/",
    siteName: "Jaswant Jayacumaar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaswant Jayacumaar · Data Analyst",
    description:
      "Analytics platforms, marketing automation and production LLM tooling for global e-commerce.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
