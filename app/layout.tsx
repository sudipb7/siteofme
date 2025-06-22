import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import { geistMono, manrope } from "@/lib/fonts";
import { QueryProvider } from "@/components/query-provider";

export { BASE_METADATA as metadata, VIEWPORT as viewport } from "@/lib/metadata";

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
