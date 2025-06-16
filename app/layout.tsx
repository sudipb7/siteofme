import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist_Mono, Geist } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tell your story | Site of me",
  description: "Tell your story and share your thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geist.variable, geistMono.variable, "antialiased font-sans")}>
        <QueryProvider>
          {children} <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
