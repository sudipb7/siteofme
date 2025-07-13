import Link from "next/link";
import Image from "next/image";
import { memo, useMemo, useCallback } from "react";

import { cn } from "@/lib/utils";
import { TipTapEditor } from "@/components/editor/tiptap";
import type { User, Site } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/hooks/stores/editor";
import { getContentMinHeight, getImageFrameStyles, mapSiteToStoreFormat } from "@/lib/utils/site";
import { FONT_SIZE_CLASSES, MAX_CONTENT_WIDTH, PLATFORM_ICONS } from "@/lib/constants/site";

interface PagePreviewProps {
  user: User;
  site: Site | null;
  isMobile?: boolean;
  className?: string;
}

export const PagePreview = memo(({ user, site, isMobile = false, className }: PagePreviewProps) => {
  const storeState = useEditorStore();

  const isHydrated = storeState.isHydrated;

  const dataSource = useMemo(() => {
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
        image: storeState.image || null,
        imageAlignment: storeState.imageAlignment,
        imageFrame: storeState.imageFrame,
      };
    }

    return mapSiteToStoreFormat(site);
  }, [
    isHydrated,
    storeState.backgroundColor,
    storeState.color,
    storeState.fontSize,
    storeState.fontFamily,
    storeState.textAlign,
    storeState.socialIcons,
    storeState.socialIconsAlignment,
    storeState.content,
    storeState.image,
    storeState.imageAlignment,
    storeState.imageFrame,
    site,
  ]);

  const {
    backgroundColor,
    color,
    fontSize,
    fontFamily,
    textAlign,
    socialIcons,
    socialIconsAlignment,
    image,
    imageAlignment,
    imageFrame,
  } = dataSource;

  const getSocialIcon = useCallback((platform: string) => {
    const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
    return IconComponent;
  }, []);

  const imageFrameStyles = useMemo(
    () => getImageFrameStyles(imageFrame, fontSize),
    [imageFrame, fontSize]
  );

  return (
    <main
      style={{
        backgroundColor,
        color,
        fontFamily: `var(--font-${fontFamily})`,
        textAlign,
        minHeight: getContentMinHeight(!!user?.emailVerified, isMobile),
      }}
      className={cn(
        "flex-1 p-4 w-full flex flex-col font-medium items-center justify-center",
        FONT_SIZE_CLASSES[fontSize],
        className
      )}
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <div
          key="main-content"
          className="w-full"
          style={{ maxWidth: `${MAX_CONTENT_WIDTH[fontSize]}rem` }}
        >
          <div
            key="image-container-wrapper"
            className={`mb-8 md:mb-10 flex ${!image ? "h-0 overflow-hidden" : ""}`}
            style={{
              justifyContent:
                imageAlignment === "left"
                  ? "flex-start"
                  : imageAlignment === "right"
                    ? "flex-end"
                    : "center",
            }}
          >
            {image && (
              <Image
                key={image}
                src={image}
                alt="Profile"
                quality={100}
                priority
                width={+imageFrameStyles.width!.toString().replace("px", "")}
                height={+imageFrameStyles.height!.toString().replace("px", "")}
                style={imageFrameStyles}
              />
            )}
          </div>
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
});

PagePreview.displayName = "PagePreview";
