import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
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

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const audience = headersList.get("x-audience") || "consumer";

  if (audience === "corporate") {
    return {
      title: "AI Growth — Team AI Upskilling",
      description:
        "A guided learning program that takes your team from zero to shipping real projects with AI. Assessments, structured modules, and a manager dashboard.",
      openGraph: {
        title: "AI Growth — Team AI Upskilling",
        description:
          "Take your team from 'I've heard of vibe coding' to shipping real projects with AI tools.",
        siteName: "AI Growth",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Growth — Team AI Upskilling",
        description:
          "A guided learning program for teams building with AI.",
      },
    };
  }

  return {
    title: "Learn Vibe Coding",
    description:
      "A structured curriculum for building with AI — from first conversation to shipped product.",
    openGraph: {
      title: "Learn Vibe Coding",
      description:
        "A structured curriculum for building with AI — from first conversation to shipped product.",
      siteName: "Learn Vibe Coding",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Learn Vibe Coding",
      description:
        "Build with AI. No prerequisites. No gatekeeping.",
    },
  };
}

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
        <Analytics />
      </body>
    </html>
  );
}
