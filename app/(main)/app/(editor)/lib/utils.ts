import debounce from "lodash.debounce";

import { patch } from "@/lib/api";
import { Site } from "@/db/schema";
import { LAYOUT_HEIGHTS } from "./constants";
import {
  FONT_SIZE,
  DEFAULT_SITE_CONFIG,
  IMAGE_FRAME,
  IMAGE_FRAME_STYLES,
  IMAGE_SIZE,
} from "../../../lib/constants";
import { EditorState, useEditorStore, type SocialIcon } from "./store";

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

export const mapSiteToStoreFormat = (
  site: Site | null
): Omit<EditorState, "isHydrated" | "isSaving"> => {
  if (!site) {
    return {
      color: DEFAULT_SITE_CONFIG.color,
      id: "",
      slug: "",
      userId: "",
      image: DEFAULT_SITE_CONFIG.image!,
      imageAlignment: DEFAULT_SITE_CONFIG.imageAlignment,
      imageFrame: DEFAULT_SITE_CONFIG.imageFrame as keyof typeof IMAGE_FRAME,
      version: DEFAULT_SITE_CONFIG.version!,
      fontSize: DEFAULT_SITE_CONFIG.fontSize,
      textAlign: DEFAULT_SITE_CONFIG.textAlign,
      fontFamily: DEFAULT_SITE_CONFIG.fontFamily,
      content: DEFAULT_SITE_CONFIG.content,
      backgroundColor: DEFAULT_SITE_CONFIG.backgroundColor,
      socialIcons: DEFAULT_SITE_CONFIG.socialIcons as SocialIcon[],
      socialIconsAlignment: DEFAULT_SITE_CONFIG.socialIconsAlignment,
    };
  }

  return {
    id: site.id,
    version: site.version,
    slug: site.slug,
    userId: site.userId,
    backgroundColor: site.backgroundColor,
    color: site.color,
    image: site.image || null,
    imageAlignment: site.imageAlignment,
    imageFrame: site.imageFrame as keyof typeof IMAGE_FRAME,
    fontSize: FONT_SIZE[site.fontSize as keyof typeof FONT_SIZE],
    fontFamily: site.fontFamily,
    textAlign: site.textAlign,
    socialIcons: Array.isArray(site.socialIcons) ? (site.socialIcons as SocialIcon[]) : [],
    socialIconsAlignment: site.socialIconsAlignment,
    content: site.content,
  };
};

export const debouncedSave = debounce(async (state: Partial<Site>) => {
  const setIsSaving = useEditorStore.getState().setIsSaving;
  try {
    setIsSaving(true);
    await patch("/sites/drafts", state);
  } finally {
    setIsSaving(false);
  }
}, 500);

export const getImageFrameStyles = (
  frame: keyof typeof IMAGE_FRAME | string,
  size: keyof typeof IMAGE_SIZE
) => {
  // Handle both enum key (e.g., 'TILTED_SQUARE') and string value (e.g., 'tilted-square')
  const frameValue =
    typeof frame === "string" && frame in IMAGE_FRAME_STYLES
      ? frame
      : IMAGE_FRAME[frame as keyof typeof IMAGE_FRAME];

  const baseStyles =
    IMAGE_FRAME_STYLES[frameValue as keyof typeof IMAGE_FRAME_STYLES] ||
    IMAGE_FRAME_STYLES[IMAGE_FRAME.SQUARE]; // Fallback to square if not found

  const sizeValue = IMAGE_SIZE[size];
  const baseSizePx = sizeValue * 4;

  // Calculate width and height based on aspect ratio
  let width = baseSizePx;
  let height = baseSizePx;

  if ("aspectRatio" in baseStyles) {
    const aspectRatio = baseStyles.aspectRatio;

    if (aspectRatio === "3/2") {
      // Horizontal rectangle (wider)
      width = baseSizePx * 1.25;
    } else if (aspectRatio === "2/3") {
      // Vertical rectangle (taller)
      height = baseSizePx * 1.25;
    }
  }

  return {
    ...baseStyles,
    width: `${width}px`,
    height: `${height}px`,
  };
};
