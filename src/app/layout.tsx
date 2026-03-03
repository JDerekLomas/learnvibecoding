import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { AudienceProvider } from "./AudienceProvider";
import { NavBar } from "./NavBar";
import type { Audience } from "@/lib/audience";
import InputWidget from "@/components/InputWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Vibe Coding",
  description:
    "A structured curriculum for building with AI — from first conversation to shipped product.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const audience = (headersList.get("x-audience") || "consumer") as Audience;
  const isCorporate = audience === "corporate";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AudienceProvider audience={audience}>
          <NavBar isCorporate={isCorporate} />
          {children}
        </AudienceProvider>
        <InputWidget allowedHosts={["localhost", "vercel.app"]} />
      </body>
    </html>
  );
}
