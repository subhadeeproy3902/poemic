import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poemic",
  description:
    "Share your image, and let's explore what it conveys. Unveil its true meaning through the beauty of verse.",
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://i.postimg.cc/bN7zKXfg/215-1x-shots-so.webp',
        width: 1000,
        height: 600,
      },
    ],
  },
  icons: {
    icon: './favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-black bg-gradient-to-bl from-orange-200 via-slate-200 to-orange-200`}
      >
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
