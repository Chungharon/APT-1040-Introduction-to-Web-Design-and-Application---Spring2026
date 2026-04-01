import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Suspense } from "react";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Africa Vibe | Discover the Soul of Africa",
  description: "Explore African heritage through festivals, arts, cuisine, and rituals. Join our community and experience the heartbeat of the continent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-brand-gold animate-pulse tracking-widest uppercase">The Continent Is Calling...</div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

