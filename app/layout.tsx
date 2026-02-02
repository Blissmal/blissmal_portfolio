import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Blissmal | Portfolio",
  description: "👋 Hey there! I'm Bethuel Maluti — Software Engineering student and Full Stack Developer.",
  keywords: ["portfolio", "react", "vite", "web development", "Bethuel Maluti", "blissmal", "full stack developer", "software engineering"],
  authors: [{ name: "Blissmal" }],
  creator: "Blissmal",
  metadataBase: new URL("https://blissmal.me"),
  icons: {
    icon: "/bliss.jpg",
  },
  openGraph: {
    title: "Blissmal | Portfolio",
    description: "👋 Hey there! I'm Bethuel Maluti — Software Engineering student and Full Stack Developer.",
    url: "https://blissmal.me",
    siteName: "Blissmal Portfolio",
    images: [
      {
        url: "/bliss.jpg",
        alt: "Blissmal Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blissmal | Portfolio",
    description: "👋 Hey there! I'm Bethuel Maluti — Full Stack Developer & AI Enthusiast.",
    images: ["/assets/bliss.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JetBrainsMono.variable} antialiased`}
      >
        <Header />
        <StairTransition />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}