import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeadScript from "@/components/ui/head-script";
import TiltEffect from "@/components/ui/tilt-effect";
import { Suspense } from "react";
import HydrationFix from "@/components/ui/hydration-fix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salomão - Assistente Empresarial",
  description: "Assistente IA com interface 3D imersiva que analisa dados empresariais, identifica oportunidades e fornece insights estratégicos para decisões mais precisas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <HeadScript />
        <TiltEffect />
        <HydrationFix />
        {children}
      </body>
    </html>
  );
}
