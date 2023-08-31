import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/styles/globals.css";
import { siteConfig } from "@/config";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers/providers";
import { SocketProvider } from "@/components/providers/socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
  keywords: [
    "Next.js",
    "Tailwind CSS",
    "NextAuth.js",
    "TypeScript",
    "Drizzle",
    "shadcn/ui",
    "Server Components",
    "Socket.io",
    "Livekit",
  ],
  authors: [
    {
      name: "Sukrit Saha",
      url: "https://github.com/Sukrittt",
    },
  ],
  creator: "Sukrittt",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@SukritSaha11",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <SocketProvider>{children}</SocketProvider>
        </body>
      </html>
    </Providers>
  );
}
