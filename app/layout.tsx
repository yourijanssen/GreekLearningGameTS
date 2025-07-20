import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // <--- import the wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Greek Language Learning App',
  description: 'Learn Greek with interactive games and progress tracking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} greek-background antialiased`}
      >
        <Providers> {/* <-- wrap your app with Providers */}
          <div className="greek-main-container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}