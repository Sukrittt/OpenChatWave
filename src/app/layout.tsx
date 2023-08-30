import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/styles/globals.css";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/components/providers/socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenChatWave",
  description: "Come chat with the entire world.",
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
