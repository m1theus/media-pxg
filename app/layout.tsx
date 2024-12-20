import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Média Catch | PxG Catch Average | Pokemon Search",
  description:
    "Discover catch averages, levels, prices, and more for Pokemon in PxG (PokeXGames)! | Média de catch",
  keywords: [
    "PxG",
    "Pokemon",
    "Catch Average",
    "Levels",
    "Prices",
    "PokeXGames",
    "Media Ball PXG",
    "Media PXG",
    "Media Catch",
  ],
  authors: [{ name: "Media PXG", url: "https://media-pxg.vercel.app" }],
  openGraph: {
    title: "Média Catch | PxG Catch Average | Pokemon Search",
    description:
      "Discover catch averages, levels, prices, and more for Pokemon in PxG (PokeXGames)!",
    url: "https://media-pxg.vercel.app",
    type: "website",
    images: [
      {
        url: "https://media-pxg.vercel.app/banner.png",
        alt: "PxG Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Média Catch | PxG Catch Average | Pokemon Search",
    description:
      "Discover catch averages, levels, prices, and more for Pokemon in PxG!",
    images: ["https://media-pxg.vercel.app/banner.png"],
  },
  metadataBase: new URL("https://media-pxg.vercel.app"),
  alternates: {
    canonical: "https://media-pxg.vercel.app",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let localTheme;
  if (typeof window !== "undefined") {
    localTheme = localStorage.getItem("theme") || "system";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>PxG Catch Average - Pokemon Search</title>
        <meta
          name="description"
          content="Discover catch averages, levels, prices, and more for Pokemon in PxG (PokeXGames)!"
        />
        <meta
          name="keywords"
          content="PxG, Pokemon, Catch Average, Levels, Prices, PokeXGames, Media Ball PXG, Media PXG"
        />
        <meta name="author" content="https://media-pxg.vercel.app" />
        <meta
          property="og:title"
          content="PxG Catch Average - Pokemon Search"
        />
        <meta
          property="og:description"
          content="Discover catch averages, levels, prices, and more for Pokemon in PxG (PokeXGames)!"
        />
        <meta property="og:url" content="https://media-pxg.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://media-pxg.vercel.app/banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PxG Catch Average - Pokemon Search"
        />
        <meta
          name="twitter:description"
          content="Discover catch averages, levels, prices, and more for Pokemon in PxG!"
        />
        <meta
          name="twitter:image"
          content="https://media-pxg.vercel.app/banner.png"
        />
        <link rel="canonical" href="https://media-pxg.vercel.app" />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={localTheme ?? "dark"}
          enableSystem
        >
          <main className="flex-1 p-4">
            {children}
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
