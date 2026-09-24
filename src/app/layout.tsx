import type { Metadata, Viewport } from "next";
import { Noto_Sans_Telugu, Plus_Jakarta_Sans } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  variable: "--font-noto-telugu",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nayi Samakhya | ప్రజా సమాఖ్య",
  description:
    "Grassroots civic-tech portal for Telangana & Andhra Pradesh — mandal hubs, booth survey, and welfare telemetry.",
  applicationName: "Nayi Samakhya",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="te"
      className={`${plusJakarta.variable} ${notoTelugu.variable} h-full`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink antialiased">
        <LanguageProvider>
          <StickyHeader />
          <main className="flex-1 pb-24 md:pb-8">{children}</main>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
