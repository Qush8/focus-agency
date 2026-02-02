import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageEntrance } from "@/components/layout/PageEntrance";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "landing_f",
  description: "we are best in the world for landing page",
  openGraph: {
    title: "landing_f",
    description: "we are best in the world for landing page",
    url: "https://landing_f.com",
    siteName: "landing_f",
   
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SmoothScroll>
          <PageEntrance>{children}</PageEntrance>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
