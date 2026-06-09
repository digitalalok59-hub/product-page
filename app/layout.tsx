import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MetaPixel, MetaPixelNoScript } from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WarmBox Portable Food Warmer",
  description: "Order WarmBox Portable Food Warmer with Cash On Delivery.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetaPixel />
        <MetaPixelNoScript />
        {children}
      </body>
    </html>
  );
}
