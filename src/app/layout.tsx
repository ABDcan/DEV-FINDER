import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFi",
  description:
    "An application to help pair programming with other developers online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />

          <div className="container mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
