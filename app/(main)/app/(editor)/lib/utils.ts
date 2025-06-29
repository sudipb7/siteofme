import debounce from "lodash.debounce";

import { patch } from "@/lib/api";
import { Site } from "@/db/schema";
import { LAYOUT_HEIGHTS } from "./constants";
import { FONT_SIZE, DEFAULT_SITE_CONFIG, IMAGE_FRAME } from "../../../lib/constants";
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
    image: site.image,
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
