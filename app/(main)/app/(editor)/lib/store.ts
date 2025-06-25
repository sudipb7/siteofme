import { create } from "zustand";
import { COLOR, BACKGROUND_COLOR, FONT_SIZE, FONT_FAMILY } from "../../../lib/constants";
import type { TextAlign } from "./types";

export interface SocialIcon {
  id: string;
  platform: string;
  url: string;
}

interface EditorStore {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  color: string;
  setColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  textAlign: TextAlign;
  setTextAlign: (align: TextAlign) => void;
  socialIcons: SocialIcon[];
  setSocialIcons: (icons: SocialIcon[]) => void;
  socialIconsAlignment: TextAlign;
  setSocialIconsAlignment: (align: TextAlign) => void;
  content: string;
  setContent: (content: string) => void;
}

export const useEditorStore = create<EditorStore>(set => ({
  color: COLOR.BLACK,
  backgroundColor: BACKGROUND_COLOR.CREAM,
  fontSize: FONT_SIZE.M,
  fontFamily: FONT_FAMILY.SPACE_GROTESK,
  textAlign: "left",
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
  ],
  content: `<p>Hey there, I am <strong>Sudip Biswas.</strong></p><p>I am a full-time Software Engineer and part-time <em>Indie Hacker</em> with interest in creating <strong><em>"consumer products"</em></strong>.</p><p>Don't forget to visit my <a target="_blank" rel="noopener noreferrer nofollow" class="underline underline-offset-2" href="https://sudip.codes">portfolio</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="underline underline-offset-2" href="https://x.com/sudipcodes">X</a>.</p>`,
  socialIconsAlignment: "left",
  setColor: (color: string) => set({ color }),
  setBackgroundColor: (color: string) => set({ backgroundColor: color }),
  setFontSize: (size: number) => set({ fontSize: size }),
  setFontFamily: (family: string) => set({ fontFamily: family }),
  setTextAlign: (align: TextAlign) => set({ textAlign: align }),
  setSocialIcons: (icons: SocialIcon[]) => set({ socialIcons: icons }),
  setSocialIconsAlignment: (align: TextAlign) => set({ socialIconsAlignment: align }),
  setContent: (content: string) => set({ content }),
}));
