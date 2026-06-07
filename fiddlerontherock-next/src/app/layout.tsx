import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { seoKeywords, site } from "@/lib/data";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: "Live Violin Concerts in Sedona | Fiddler on the Rock", template: "%s | Fiddler on the Rock" }, description: site.description, keywords: seoKeywords, openGraph: { title: "Live Violin Concerts in Sedona | Fiddler on the Rock", description: site.description, url: site.url, siteName: site.name, images: [{ url: "/images/tyler-hero.jpg", width: 1200, height: 630, alt: "Tyler Carson performing in Sedona's Red Rocks" }], locale: "en_US", type: "website" }, twitter: { card: "summary_large_image", title: "Live Violin Concerts in Sedona | Fiddler on the Rock", description: site.description, images: ["/images/tyler-hero.jpg"] }, alternates: { canonical: site.url } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="h-full antialiased"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Space+Mono:wght@400;700&display=swap" /></head><body><CartProvider><Nav /><main className="site-main">{children}</main><Footer /><SpeedInsights /></CartProvider></body></html>;
}

