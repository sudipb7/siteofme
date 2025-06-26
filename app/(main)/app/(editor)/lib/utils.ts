import { Site } from "@/db/schema";
import { LAYOUT_HEIGHTS } from "./constants";
import { FONT_SIZE, BACKGROUND_COLOR, COLOR, FONT_FAMILY } from "../../../lib/constants";
import type { SocialIcon } from "./store";
import type { TextAlign } from "./types";

export const getContentMinHeight = (isEmailVerified: boolean, isMobile: boolean = false) => {
  const baseHeight = `100dvh - ${LAYOUT_HEIGHTS.HEADER}`;

  if (isMobile) {
    return isEmailVerified
      ? `calc(${baseHeight} - ${LAYOUT_HEIGHTS.TAB_BAR})`
      : `calc(${baseHeight} - ${LAYOUT_HEIGHTS.TAB_BAR} - ${LAYOUT_HEIGHTS.VERIFICATION_ALERT})`;
  }

  return isEmailVerified
    ? `calc(${baseHeight})`
    : `calc(${baseHeight} - ${LAYOUT_HEIGHTS.VERIFICATION_ALERT})`;
};

export const mapSiteToStoreFormat = (site: Site | null) => {
  if (!site) {
    return {
      backgroundColor: BACKGROUND_COLOR.CREAM,
      color: COLOR.BLACK,
      fontSize: FONT_SIZE.M,
      fontFamily: FONT_FAMILY.SPACE_GROTESK,
      textAlign: "left" as TextAlign,
      socialIcons: [
        {
          id: "3ef024c7-934e-4823-ba54-7efcf714c8df",
          platform: "website",
          url: "https://sudip.codes",
        },
        {
          id: "953f397a-7199-432a-844e-c5ebc68fb585",
          platform: "x",
          url: "https://x.com/sudipcodes",
        },
      ] as SocialIcon[],
      content: `<p>Hey there, I am <strong>Sudip Biswas.</strong></p><p>I am a full-time Software Engineer and part-time <em>Indie Hacker</em> with interest in creating <strong><em>"consumer products"</em></strong>.</p><p>Don't forget to visit my <a target="_blank" rel="noopener noreferrer nofollow" class="underline underline-offset-2" href="https://sudip.codes">portfolio</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="underline underline-offset-2" href="https://x.com/sudipcodes">X</a>.</p>`,
      socialIconsAlignment: "left" as TextAlign,
    };
  }

  return {
    backgroundColor: site.backgroundColor,
    color: site.color,
    fontSize: FONT_SIZE[site.fontSize as keyof typeof FONT_SIZE],
    fontFamily: site.fontFamily,
    textAlign: site.textAlign,
    socialIcons: Array.isArray(site.socialIcons) ? (site.socialIcons as SocialIcon[]) : [],
    socialIconsAlignment: site.socialIconsAlignment,
    content: site.content,
  };
};
