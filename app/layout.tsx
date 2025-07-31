import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MockMate",
  description: "An AI-powered platform for mock interview",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} ${monaSans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
