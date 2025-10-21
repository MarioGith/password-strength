import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://password-strength.app"),
  title:
    "Password Strength Checker - Power Up Your Passwords | Test & Generate Secure Passwords",
  description:
    "Test your password strength and watch your warrior evolve! Create legendary passwords with our advanced password generator. Features 6 levels of password security, real-time strength analysis, and multiple generation methods.",
  keywords: [
    "password strength checker",
    "password generator",
    "secure password",
    "password security",
    "strong password",
    "password tester",
    "password analyzer",
    "cybersecurity",
    "online security",
  ],
  authors: [{ name: "Password Strength" }],
  creator: "Password Strength",
  publisher: "Password Strength",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://password-strength.app",
    title: "Password Strength Checker - Power Up Your Passwords",
    description:
      "Test your password strength and watch your warrior evolve! Create legendary passwords with our advanced password generator.",
    siteName: "Password Strength Checker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Strength Checker - Power Up Your Passwords",
    description:
      "Test your password strength and watch your warrior evolve! Create legendary passwords with our advanced password generator.",
    creator: "@passwordstrength",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://password-strength.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
