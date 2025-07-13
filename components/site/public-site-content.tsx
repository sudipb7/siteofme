import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Site } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { getImageFrameStyles } from "@/lib/utils/site";
import type { SocialIcon } from "@/hooks/stores/editor";
import { PublicSiteEditor } from "./public-site-editor";
import { FONT_SIZE_CLASSES, MAX_CONTENT_WIDTH, PLATFORM_ICONS } from "@/lib/constants/site";

interface PublicSiteContentProps {
  site: Site;
}

export const PublicSiteContent = ({ site }: PublicSiteContentProps) => {
  const getSocialIcon = (platform: string) => {
    const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
    return IconComponent;
  };

  const imageFrameStyles = getImageFrameStyles(site.imageFrame, site.fontSize);
  const socialIcons = Array.isArray(site.socialIcons) ? site.socialIcons : [];

  return (
    <main
      style={{
        backgroundColor: site.backgroundColor,
        color: site.color,
        fontFamily: `var(--font-${site.fontFamily})`,
        textAlign: site.textAlign,
        minHeight: "100dvh",
      }}
      className={cn(
        "flex-1 p-4 w-full flex flex-col font-medium items-center justify-center",
        FONT_SIZE_CLASSES[site.fontSize]
      )}
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-full" style={{ maxWidth: `${MAX_CONTENT_WIDTH[site.fontSize]}rem` }}>
          {site.image && (
            <div
              className="mb-8 md:mb-10 flex"
              style={{
                justifyContent:
                  site.imageAlignment === "left"
                    ? "flex-start"
                    : site.imageAlignment === "right"
                      ? "flex-end"
                      : "center",
              }}
            >
              <Image
                src={site.image}
                alt="Profile"
                quality={100}
                priority
                width={+imageFrameStyles.width.replace("px", "")}
                height={+imageFrameStyles.height.replace("px", "")}
                style={imageFrameStyles}
              />
            </div>
          )}
          <PublicSiteEditor content={site.content} />
          {socialIcons.length > 0 && (
            <div
              className="flex gap-3 mt-8 md:mt-10"
              style={{
                justifyContent:
                  site.socialIconsAlignment === "left"
                    ? "flex-start"
                    : site.socialIconsAlignment === "right"
                      ? "flex-end"
                      : "center",
              }}
            >
              {socialIcons.map((icon: SocialIcon, index: number) => {
                const IconComponent = getSocialIcon(icon.platform);
                return (
                  <Button
                    key={icon.id || index}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="w-auto px-0"
                  >
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
