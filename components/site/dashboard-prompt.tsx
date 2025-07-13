import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { FONT_SIZE_CLASSES, MAX_CONTENT_WIDTH, DEFAULT_SITE_CONFIG } from "@/lib/constants/site";

export const DashboardPrompt = () => {
  return (
    <main
      style={{
        backgroundColor: DEFAULT_SITE_CONFIG.backgroundColor,
        color: DEFAULT_SITE_CONFIG.color,
        fontFamily: `var(--font-${DEFAULT_SITE_CONFIG.fontFamily})`,
        textAlign: DEFAULT_SITE_CONFIG.textAlign,
        minHeight: "100dvh",
      }}
      className={cn(
        "flex-1 p-4 w-full flex flex-col font-medium items-center justify-center",
        FONT_SIZE_CLASSES[DEFAULT_SITE_CONFIG.fontSize]
      )}
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <div
          className="w-full"
          style={{ maxWidth: `${MAX_CONTENT_WIDTH[DEFAULT_SITE_CONFIG.fontSize]}rem` }}
        >
          <div className="outline-none space-y-4">
            <p>Hey there! 👋🏻</p>
            <p>This is your personal space. Your site will appear here once you publish it.</p>
            <p>
              Head over to your{" "}
              <Link href="/app" className="underline underline-offset-2">
                dashboard
              </Link>{" "}
              to start building and share your story with the world.
            </p>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t pt-4 flex flex-col items-center w-full border-muted-foreground/40 flex-1 max-h-28">
        <Link href="/" className="flex items-end gap-x-1.5">
          <Image
            src="/logo.png"
            alt="Siteof Logo"
            width={100}
            height={100}
            priority
            quality={100}
            className="object-contain min-h-7 max-w-7 -mb-0.5"
          />
          <div className="flex flex-col font-manrope">
            <span className="text-[10px] text-muted-foreground">powered by</span>
            <span className="font-medium text-base">siteof.me</span>
          </div>
        </Link>
      </div>

      <div className="max-md:hidden fixed bottom-8 right-8">
        <Link href="/" className="flex items-center gap-x-1.5">
          <Image
            src="/logo.png"
            alt="Siteof Logo"
            width={100}
            height={100}
            priority
            quality={100}
            className="object-contain min-h-8 max-w-8"
          />
          <span className="font-medium text-base font-manrope">siteof.me</span>
        </Link>
      </div>
    </main>
  );
};
