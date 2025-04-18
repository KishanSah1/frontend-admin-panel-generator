import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "../context/AuthProvider";
import { OperationProvider } from "../context/OperationContext";
import { SelectedUseCaseProvider } from "../context/SelectedUseCaseContext";
import { DbProvider } from "@/context/DbContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdminXpert",
  description: "An Admin Panel Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <DbProvider>
            <OperationProvider>
              <SelectedUseCaseProvider>
                <Toaster />
                {children}
              </SelectedUseCaseProvider>
            </OperationProvider>
          </DbProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
