import { create } from "zustand";
import { Site } from "@/db/schema";
import type { TextAlign } from "./types";
import { debouncedSave, mapSiteToStoreFormat } from "./utils";
import { COLOR, BACKGROUND_COLOR, FONT_SIZE, FONT_FAMILY } from "../../../lib/constants";

export interface SocialIcon {
  id: string;
  platform: string;
  url: string;
}

interface EditorStore {
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
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  color: COLOR.BLACK,
  id: "",
  backgroundColor: BACKGROUND_COLOR.CREAM,
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
  isHydrated: false,
  version: 0,
  slug: "",
  userId: "",
  isSaving: false,
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
    isHydrated: state.isHydrated,
    isSaving: state.isSaving,
  };

  if (JSON.stringify(currentState) === JSON.stringify(prevState)) {
    return;
  }

  prevState = currentState;

  if (!state.isHydrated) {
    return;
  }

  debouncedSave(currentState);
});
