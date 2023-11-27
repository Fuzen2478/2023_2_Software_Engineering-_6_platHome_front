import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlatHome",
};

export const viewport = {
  width: "1920",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 0.1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
