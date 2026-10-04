import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Personal Stylist | Elevate Your Wardrobe",
  description: "An AI-powered personal fashion platform for men that understands the individual and helps him discover his style, build his wardrobe, and dress confidently for every occasion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
