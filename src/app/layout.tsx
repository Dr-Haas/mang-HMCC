import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL, SITE_NAME } from "./lib/constants";
import { Layout } from "@/components/Layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Site HMCC. Découvrez nos services et contenus.",
  keywords: ["HMCC"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Accueil`,
    description: "Site HMCC. Découvrez nos services et contenus.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Accueil`,
    description: "Site HMCC. Découvrez nos services et contenus.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/vercel.svg", type: "image/svg+xml" },
      { url: "/vercel.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: ["/vercel.svg"],
    apple: ["/vercel.svg"],
  },
  verification: {
    // À remplir quand vous avez les identifiants Google Search Console
    // google: "votre-code-google",
    // yandex: "votre-code-yandex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
