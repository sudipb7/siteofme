import { Toaster } from "sonner";
import { Geist_Mono, Manrope } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";

export { BASE_METADATA as metadata, VIEWPORT as viewport } from "@/lib/metadata";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(manrope.variable, geistMono.variable, "antialiased font-manrope")}>
        <QueryProvider>
          {children} <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
