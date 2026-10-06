import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CookieBanner from "@/components/CookieBanner";

import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "Vastrié | The Master of Personal Style",
  description: "An AI-powered personal fashion platform for men that understands the individual and helps him discover his style, build his wardrobe, and dress confidently for every occasion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning className={`${playfair.variable} ${montserrat.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
              <CookieBanner />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
