import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KMS",
  description: "Mange your processes eficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={``}>
      <body
        className={`min-h-screen w-full ${geistSans.variable} ${geistMono.variable} text-sm bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}