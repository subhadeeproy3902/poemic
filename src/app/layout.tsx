import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poemic",
  description:
    "Share your image, and let's explore what it conveys. Unveil its true meaning through the beauty of verse.",
    openGraph: {
      type: 'website',
      images: [
        {
          url: '/215_1x_shots_so.webp',
          width: 1000,
          height: 600,
        },
      ],
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
      </body>
    </html>
  );
}
