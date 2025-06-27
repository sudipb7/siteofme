import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { User, Site } from "@/db/schema";
import { TipTapEditor } from "./tiptap";
import { useEditorStore } from "../lib/store";
import { Button } from "@/components/ui/button";
import { getContentMinHeight, mapSiteToStoreFormat } from "../lib/utils";
import { FONT_SIZE, PLATFORM_ICONS } from "@/app/(main)/lib/constants";

interface PagePreviewProps {
  user: User;
  site: Site | null;
  isMobile?: boolean;
  className?: string;
}

export const PagePreview = ({ user, site, isMobile = false, className }: PagePreviewProps) => {
  const storeState = useEditorStore();

  const isHydrated = storeState.isHydrated;

  const getDataSource = () => {
    if (isHydrated) {
      return {
        backgroundColor: storeState.backgroundColor,
        color: storeState.color,
        fontSize: storeState.fontSize,
        fontFamily: storeState.fontFamily,
        textAlign: storeState.textAlign,
        socialIcons: storeState.socialIcons,
        socialIconsAlignment: storeState.socialIconsAlignment,
        content: storeState.content,
      };
    }

    return mapSiteToStoreFormat(site);
  };

  const {
    backgroundColor,
    color,
    fontSize,
    fontFamily,
    textAlign,
    socialIcons,
    socialIconsAlignment,
  } = getDataSource();

  const getSocialIcon = (platform: string) => {
    const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
    return IconComponent;
  };

  const fontSizeInPx = useMemo(() => {
    switch (fontSize) {
      case FONT_SIZE.S:
        return "16px`";
      case FONT_SIZE.M:
        return "18px";
      case FONT_SIZE.L:
        return "20px";
      default:
        return "18px";
    }
  }, [fontSize]);

  const maxWidth = useMemo(() => {
    switch (fontSize) {
      case FONT_SIZE.S:
        return "24rem";

      case FONT_SIZE.M:
        return "28rem";

      case FONT_SIZE.L:
        return "32rem";

      default:
        return "28rem";
    }
  }, [fontSize]);

  return (
    <main
      style={{
        backgroundColor,
        color,
        fontSize: fontSizeInPx,
        fontFamily: `var(--font-${fontFamily})`,
        textAlign,
        minHeight: getContentMinHeight(!!user?.emailVerified, isMobile),
      }}
      className={cn(
        "flex-1 p-4 w-full flex flex-col font-medium items-center justify-center",
        className
      )}
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-full" style={{ maxWidth }}>
          <TipTapEditor site={site || null} />
          {socialIcons.length > 0 && (
            <div
              className="flex gap-3 mt-8 md:mt-10"
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
