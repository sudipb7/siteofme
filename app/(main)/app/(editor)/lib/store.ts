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
}

export const useEditorStore = create<EditorStore>(set => ({
  color: COLOR.BLACK,
  backgroundColor: BACKGROUND_COLOR.CREAM,
  fontSize: FONT_SIZE.M,
  fontFamily: FONT_FAMILY.MANROPE,
  textAlign: "left",
  socialIcons: [],
  socialIconsAlignment: "left",
  setColor: (color: string) => set({ color }),
  setBackgroundColor: (color: string) => set({ backgroundColor: color }),
  setFontSize: (size: number) => set({ fontSize: size }),
  setFontFamily: (family: string) => set({ fontFamily: family }),
  setTextAlign: (align: TextAlign) => set({ textAlign: align }),
  setSocialIcons: (icons: SocialIcon[]) => set({ socialIcons: icons }),
  setSocialIconsAlignment: (align: TextAlign) => set({ socialIconsAlignment: align }),
}));
