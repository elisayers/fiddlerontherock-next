import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiddler on the Rock — Tyler Carson | Sedona Violinist",
  description:
    "Tyler Carson performs original violin music among the red rocks of Sedona, Arizona. Private serenades, nature concerts, and one-of-a-kind experiences. As seen on CBS Mornings.",
  keywords: [
    "Sedona violinist",
    "Fiddler on the Rock",
    "Tyler Carson",
    "Sedona private concert",
    "red rock music",
    "Sedona serenade",
    "CBS Mornings violinist",
  ],
  openGraph: {
    title: "Fiddler on the Rock | Tyler Carson",
    description:
      "Violin music among the red rocks of Sedona. Private serenades, nature concerts, and unforgettable experiences.",
    siteName: "Fiddler on the Rock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Preconnect for font performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Cormorant Garamond — display serif */}
        {/* DM Sans — body */}
        {/* Space Mono — eyebrow labels */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Space+Mono:wght@400;700&display=swap"
        />
      </head>
      <body
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          background: "var(--color-ink)",
          color: "var(--color-cream)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
