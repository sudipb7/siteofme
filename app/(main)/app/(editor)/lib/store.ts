import { create } from "zustand";
import { Site } from "@/db/schema";
import type { TextAlign } from "./types";
import { debouncedSave, mapSiteToStoreFormat } from "./utils";
import { FONT_SIZE, DEFAULT_SITE_CONFIG, IMAGE_FRAME } from "../../../lib/constants";

export interface SocialIcon {
  id: string;
  platform: string;
  url: string;
}

export type EditorState = {
  backgroundColor: string;
  color: string;
  fontSize: keyof typeof FONT_SIZE;
  fontFamily: string;
  textAlign: TextAlign;
  socialIcons: SocialIcon[];
  socialIconsAlignment: TextAlign;
  content: string;
  isHydrated: boolean;
  version: number;
  slug: string;
  isSaving: boolean;
  id: string;
  userId: string;
  image: string | null;
  imageAlignment: TextAlign;
  imageFrame: keyof typeof IMAGE_FRAME;
};

type EditorSetters = {
  setId: (id: string) => void;
  setVersion: (version: number) => void;
  setSlug: (slug: string) => void;
  setIsSaving: (isSaving: boolean) => void;
  setUserId: (userId: string) => void;
  setBackgroundColor: (color: string) => void;
  setColor: (color: string) => void;
  setFontSize: (size: keyof typeof FONT_SIZE) => void;
  setFontFamily: (family: string) => void;
  setTextAlign: (align: TextAlign) => void;
  setSocialIcons: (icons: SocialIcon[]) => void;
  setSocialIconsAlignment: (align: TextAlign) => void;
  setContent: (content: string) => void;
  hydrate: (site: Site | null) => void;
  setImage: (image: string | null) => void;
  setImageAlignment: (align: TextAlign) => void;
  setImageFrame: (frame: keyof typeof IMAGE_FRAME) => void;
};

interface EditorStore extends EditorState, EditorSetters {}

export const useEditorStore = create<EditorStore>((set, get) => ({
  color: DEFAULT_SITE_CONFIG.color,
  id: "",
  backgroundColor: DEFAULT_SITE_CONFIG.backgroundColor,
  fontSize: DEFAULT_SITE_CONFIG.fontSize,
  fontFamily: DEFAULT_SITE_CONFIG.fontFamily,
  textAlign: DEFAULT_SITE_CONFIG.textAlign,
  socialIcons: DEFAULT_SITE_CONFIG.socialIcons as SocialIcon[],
  content: DEFAULT_SITE_CONFIG.content,
  socialIconsAlignment: DEFAULT_SITE_CONFIG.socialIconsAlignment,
  isHydrated: false,
  version: DEFAULT_SITE_CONFIG.version!,
  slug: "",
  userId: "",
  isSaving: false,
  image: DEFAULT_SITE_CONFIG.image!,
  imageAlignment: DEFAULT_SITE_CONFIG.imageAlignment,
  imageFrame: DEFAULT_SITE_CONFIG.imageFrame as keyof typeof IMAGE_FRAME,
  setImage: (image: string | null) => set({ image }),
  setImageAlignment: (align: TextAlign) => set({ imageAlignment: align }),
  setImageFrame: (frame: keyof typeof IMAGE_FRAME) => set({ imageFrame: frame }),
  setId: (id: string) => set({ id }),
  setIsSaving: (isSaving: boolean) => set({ isSaving }),
  setVersion: (version: number) => set({ version }),
  setSlug: (slug: string) => set({ slug }),
  setUserId: (userId: string) => set({ userId }),
  setColor: (color: string) => set({ color }),
  setBackgroundColor: (color: string) => set({ backgroundColor: color }),
  setFontSize: (size: keyof typeof FONT_SIZE) => set({ fontSize: size }),
  setFontFamily: (family: string) => set({ fontFamily: family }),
  setTextAlign: (align: TextAlign) => set({ textAlign: align }),
  setSocialIcons: (icons: SocialIcon[]) => set({ socialIcons: icons }),
  setSocialIconsAlignment: (align: TextAlign) => set({ socialIconsAlignment: align }),
  setContent: (content: string) => set({ content }),
  hydrate: (site: Site | null) => {
    if (get().isHydrated) return;

    const siteData = mapSiteToStoreFormat(site);
    set({
      ...siteData,
      isHydrated: true,
    });
  },
}));

let prevState = {};
let isInitialHydration = true;

useEditorStore.subscribe(state => {
  const currentState = {
    backgroundColor: state.backgroundColor,
    color: state.color,
    fontSize: state.fontSize,
    fontFamily: state.fontFamily,
    textAlign: state.textAlign,
    socialIcons: state.socialIcons,
    socialIconsAlignment: state.socialIconsAlignment,
    content: state.content,
    version: state.version,
    slug: state.slug,
    userId: state.userId,
    id: state.id,
    image: state.image,
    imageAlignment: state.imageAlignment,
    imageFrame: state.imageFrame,
  };

  if (JSON.stringify(currentState) === JSON.stringify(prevState)) {
    return;
  }

  prevState = currentState;

  // Skip save if not hydrated
  if (!state.isHydrated) {
    return;
  }

  // Skip save during initial hydration
  if (isInitialHydration) {
    isInitialHydration = false;
    return;
  }

  debouncedSave(currentState);
});
