import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';
import Providers from "./providers";
import Navbar from "@/components/gameUI/Navbar";
import '@/styles/layout.css';
import { AuthProvider } from "@/contexts/AuthContext";

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
        className={`${geistSans.variable} ${geistMono.variable} greek-background antialiased`} // Greek font is used in CSS now
      >
        <Providers>
              <AuthProvider>
          <Navbar />
          <main className="pt-16 min-h-screen"> {/* pt-16 now handled by our .pt-16 utility */}
            <div className="greek-main-container">
              {children}
            </div>
          </main>
     <footer className="layout-footer">
        <small>Learn Greek by Playing Typing Games!</small>
        <br />
        <small>Made with ❤️ by <i>Youri Janssen</i></small>
      </footer>
      </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}