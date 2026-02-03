import type { Metadata } from "next";
import "./globals.css";
import { WasteProvider } from "@/core/context/WasteContext";

export const metadata: Metadata = {
  title: "YUKTI",
  description: "Smart Waste Management System for Guwahati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <WasteProvider>
          {children}
        </WasteProvider>
      </body>
    </html>
  );
}
