import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import * as fonts from "@/lib/fonts";
import { QueryProvider } from "@/components/query-provider";

export { BASE_METADATA as metadata, VIEWPORT as viewport } from "@/lib/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          Object.values(fonts).map(font => font.variable),
          "antialiased font-manrope"
        )}
      >
        <QueryProvider>
          {children} <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
