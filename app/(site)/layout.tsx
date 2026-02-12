// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from 'app/(site)/providers';

// Assuming you are using Geist fonts, as defined in your provided files
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIVEBOMB Motorsport Magazine", // Updated title based on your Header
  description: "DIVEBOMB Motorsport: F1 News, Indycar, Formula E, and more", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is necessary for next-themes manipulation of the <html> tag
    <html lang="en" suppressHydrationWarning>
      <body
        // Apply font variables and antialiased class
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
          
          bg-white dark:bg-zinc-900 transition-colors`}
      >
        {/* Wrap the children with the ThemeProvider */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}