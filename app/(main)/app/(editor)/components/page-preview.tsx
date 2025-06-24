import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { User } from "@/db/schema";
import { useEditorStore } from "../lib/store";
import { getContentMinHeight } from "../lib/utils";
import { PLATFORM_ICONS } from "@/app/(main)/lib/constants";
import { Button } from "@/components/ui/button";

interface PagePreviewProps {
  user: User;
  isMobile?: boolean;
  className?: string;
}

export const PagePreview = ({ user, isMobile = false, className }: PagePreviewProps) => {
  const {
    backgroundColor,
    color,
    fontSize,
    fontFamily,
    textAlign,
    socialIcons,
    socialIconsAlignment,
  } = useEditorStore();

  const getSocialIcon = (platform: string) => {
    const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
    return IconComponent;
  };

  return (
    <main
      style={{
        backgroundColor,
        color,
        fontSize: `${fontSize}px`,
        fontFamily: `var(--font-${fontFamily})`,
        textAlign,
        minHeight: getContentMinHeight(!!user?.emailVerified, isMobile),
      }}
      className={cn(
        "flex-1 p-4 w-full flex flex-col font-medium items-center justify-center",
        className
      )}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full mx-auto space-y-4">
          <p>Hey there, I am John Doe.</p>
          <p>
            I am a full-time Software Engineer and part-time Indie Hacker with strong design sense.
          </p>
          <p>Don&apos;t forget to visit my portfolio and X.</p>

          {socialIcons.length > 0 && (
            <div
              className="flex gap-1.5 pt-2"
              style={{
                justifyContent:
                  socialIconsAlignment === "left"
                    ? "flex-start"
                    : socialIconsAlignment === "right"
                      ? "flex-end"
                      : "center",
              }}
            >
              {socialIcons.map(icon => {
                const IconComponent = getSocialIcon(icon.platform);
                return (
                  <Button key={icon.id} asChild variant="ghost" size="icon" className="w-auto px-0">
                    <Link
                      href={icon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${icon.platform}`}
                      className="hover:bg-transparent"
                    >
                      <IconComponent className="!size-6" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden border-t pt-4 flex flex-col items-center justify-center w-full border-muted-foreground/50">
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
          <span className="font-medium text-base">siteof.me</span>
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
          <span className="font-medium text-base">siteof.me</span>
        </Link>
      </div>
    </main>
  );
};
