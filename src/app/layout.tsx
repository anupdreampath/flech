import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flech Paper Products | Precision Board Manufacturing Since 1999",
    template: "%s | Flech Paper Products",
  },
  description:
    "Flech Paper Products - specialists in easel backs, matboard, framing backs, and specialty board manufacturing. Serving sign & display, framing, and packaging industries for 25+ years from Paterson, NJ.",
  keywords: [
    "easel backs",
    "matboard manufacturer",
    "framing backs",
    "fold lines",
    "SBS board",
    "display board",
    "paper products manufacturer",
    "B2B paper products",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col bg-paper-white text-foreground font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
