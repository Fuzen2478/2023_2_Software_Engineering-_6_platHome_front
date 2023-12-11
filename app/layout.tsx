import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Filter from "./component/Filter";
import { ShowSideBarProvider } from "./component/SideBar";

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
      <ShowSideBarProvider>
        <body className="max-w-[100vw] select-none">{children}</body>
      </ShowSideBarProvider>
    </html>
  );
}
