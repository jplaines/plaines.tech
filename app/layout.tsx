import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jplaines.com",
);
const socialImage = new URL("/og.png", metadataBase).toString();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Jorden Plaines | IT, Cybersecurity & AI Security",
    template: "%s | Jorden Plaines",
  },
  description:
    "Jorden Plaines is an IT professional building toward cybersecurity and AI security through hands-on work across identity, endpoints, Microsoft platforms, and security labs.",
  applicationName: "Jorden Plaines",
  authors: [{ name: "Jorden Plaines", url: "https://jplaines.com" }],
  creator: "Jorden Plaines",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Jorden Plaines",
    title: "Jorden Plaines | IT, Cybersecurity & AI Security",
    description:
      "Hands-on IT experience, a deliberate path into cybersecurity, and evidence-led technical work.",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Jorden Plaines — IT professional building toward cybersecurity and AI security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorden Plaines | IT, Cybersecurity & AI Security",
    description:
      "Hands-on IT experience, a deliberate path into cybersecurity, and evidence-led technical work.",
    images: [socialImage],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#101311",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
