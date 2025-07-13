import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { extractRouterConfig } from "uploadthing/server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import "./globals.css";
import { cn } from "@/lib/utils";
import * as fonts from "@/lib/fonts";
import { ourFileRouter } from "@/app/api/uploadthing/core";
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
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <QueryProvider>
          {children} <Toaster richColors />
        </QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
