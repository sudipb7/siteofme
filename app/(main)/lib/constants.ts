import {
  Discord,
  Medium,
  Web,
  Tiktok,
  GitHub,
  LinkedIn,
  X,
  YouTube,
  Twitch,
  BuyMeACoffee,
  Pinterest,
  Dribbble,
  Instagram,
} from "@/components/icons";
import type { SiteInsert } from "@/db/schema";

export const FONT_FAMILY = {
  LORA: "lora",
  INTER: "inter",
  MANROPE: "manrope",
  GEIST: "geist",
  GEIST_MONO: "geist-mono",
  MERRIWEATHER: "merriweather",
  BRICOLAGE_GROTESQUE: "bricolage-grotesque",
  MONTSERRAT: "montserrat",
  OPEN_SANS: "open-sans",
  ROBOTO: "roboto",
  ROBOTO_MONO: "roboto-mono",
  POPPINS: "poppins",
  SPACE_MONO: "space-mono",
  SPACE_GROTESK: "space-grotesk",
  // * Below will be released later
  // ARCHIVO: "archivo",
  // NOTO_SERIF: "noto-serif",
  // NOTO_SANS: "noto-sans",
  // PUBLIC_SANS: "public-sans",
  // DM_SANS: "dm-sans",
  // IBM_PLEX_MONO: "ibm-plex-mono",
  // IBM_PLEX_SANS: "ibm-plex-sans",
  // PLUS_JAKARTA_SANS: "plus-jakarta-sans",
  // PT_SERIF: "pt-serif",
  // PT_SANS: "pt-sans",
  // REDDIT_MONO: "reddit-mono",
  // REDDIT_SANS: "reddit-sans",
  // RUBIK: "rubik",
} as const;

export const FONT_SIZE = {
  S: "S",
  M: "M",
  L: "L",
} as const;

export const FONT_SIZE_VALUES = {
  S: 16,
  M: 18,
  L: 22,
} as const;

export const MAX_CONTENT_WIDTH = {
  S: 24,
  M: 28,
  L: 32,
} as const;

export const IMAGE_SIZE = {
  S: 16, // 64px
  M: 20, // 80px
  L: 24, // 96px
} as const;

export const ALIGNMENT = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

export const BACKGROUND_COLOR = {
  WHITE: "#ffffff",
  LIGHT_GRAY: "#e6e6e6",
  CREAM: "#fff0cc",
  GOLDEN_YELLOW: "#FEB732",
  LIGHT_PEACH: "#FEDACD",
  CORAL: "#FC784C",
  MINT_GREEN: "#C8F1DB",
  EMERALD: "#32C276",
  LAVENDER_BLUE: "#CFE0FC",
  SKY_BLUE: "#5C98FE",
  LIGHT_PURPLE: "#E5CDFD",
  AMETHYST: "#C48EFD",
} as const;

export const COLOR = {
  BLACK: "#000000",
  WHITE: "#ffffff",
} as const;

export const SOCIAL_PLATFORMS = {
  INSTAGRAM: "instagram",
  X: "x",
  LINKEDIN: "linkedin",
  GITHUB: "github",
  YOUTUBE: "youtube",
  DISCORD: "discord",
  PINTEREST: "pinterest",
  TWITCH: "twitch",
  TIKTOK: "tiktok",
  DRIBBBLE: "dribbble",
  BUY_ME_A_COFFEE: "buy_me_a_coffee",
  MEDIUM: "medium",
  WEBSITE: "website",
} as const;

export const PLATFORM_ICONS = {
  [SOCIAL_PLATFORMS.INSTAGRAM]: Instagram,
  [SOCIAL_PLATFORMS.X]: X,
  [SOCIAL_PLATFORMS.LINKEDIN]: LinkedIn,
  [SOCIAL_PLATFORMS.GITHUB]: GitHub,
  [SOCIAL_PLATFORMS.YOUTUBE]: YouTube,
  [SOCIAL_PLATFORMS.TIKTOK]: Tiktok,
  [SOCIAL_PLATFORMS.WEBSITE]: Web,
  [SOCIAL_PLATFORMS.MEDIUM]: Medium,
  [SOCIAL_PLATFORMS.TWITCH]: Twitch,
  [SOCIAL_PLATFORMS.BUY_ME_A_COFFEE]: BuyMeACoffee,
  [SOCIAL_PLATFORMS.PINTEREST]: Pinterest,
  [SOCIAL_PLATFORMS.DRIBBBLE]: Dribbble,
  [SOCIAL_PLATFORMS.DISCORD]: Discord,
} as const;

export const IMAGE_FRAME = {
  CIRCLE: "circle",
  CIRCLE_WITH_FRAME: "circle-with-frame",
  SQUARE: "square",
  ROUNDED_SQUARE: "rounded-square",
  ROUNDED_RECTANGLE: "rounded-rectangle",
  RECTANGLE_HORIZONTAL: "rectangle-horizontal",
  RECTANGLE_VERTICAL: "rectangle-vertical",
  ROUNDED_RECTANGLE_HORIZONTAL: "rounded-rectangle-horizontal",
  ROUNDED_RECTANGLE_VERTICAL: "rounded-rectangle-vertical",
  TILTED_SQUARE: "tilted-square",
  TILTED_SQUARE_ROUNDED: "tilted-square-rounded",
  TILTED_SQUARE_ROUNDED_WITH_FRAME: "tilted-square-rounded-with-frame",
  TILTED_RECTANGLE_VERTICAL: "tilted-rectangle-vertical",
  TILTED_RECTANGLE_VERTICAL_ROUNDED: "tilted-rectangle-vertical-rounded",
  TILTED_RECTANGLE_VERTICAL_ROUNDED_WITH_FRAME: "tilted-rectangle-vertical-rounded-with-frame",
  TILTED_RECTANGLE_HORIZONTAL: "tilted-rectangle-horizontal",
  TILTED_RECTANGLE_HORIZONTAL_ROUNDED: "tilted-rectangle-horizontal-rounded",
  TILTED_RECTANGLE_HORIZONTAL_ROUNDED_WITH_FRAME: "tilted-rectangle-horizontal-rounded-with-frame",
} as const;

export const IMAGE_FRAME_STYLES = {
  [IMAGE_FRAME.CIRCLE]: {
    borderRadius: "50%",
    aspectRatio: "1",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.CIRCLE_WITH_FRAME]: {
    borderRadius: "50%",
    aspectRatio: "1",
    objectFit: "cover" as const,
    borderWidth: "4px",
    borderColor: "#ffffff",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  [IMAGE_FRAME.SQUARE]: {
    aspectRatio: "1",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.ROUNDED_SQUARE]: {
    borderRadius: "0.5rem",
    aspectRatio: "1",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.ROUNDED_RECTANGLE]: {
    borderRadius: "0.5rem",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.RECTANGLE_HORIZONTAL]: {
    aspectRatio: "3/2",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.RECTANGLE_VERTICAL]: {
    aspectRatio: "2/3",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.ROUNDED_RECTANGLE_HORIZONTAL]: {
    borderRadius: "0.5rem",
    aspectRatio: "3/2",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.ROUNDED_RECTANGLE_VERTICAL]: {
    borderRadius: "0.5rem",
    aspectRatio: "2/3",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_SQUARE]: {
    transform: "rotate(-6deg)",
    aspectRatio: "1",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_SQUARE_ROUNDED]: {
    transform: "rotate(-6deg)",
    borderRadius: "0.5rem",
    aspectRatio: "1",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_SQUARE_ROUNDED_WITH_FRAME]: {
    transform: "rotate(-6deg)",
    borderRadius: "0.5rem",
    aspectRatio: "1",
    objectFit: "cover" as const,
    borderWidth: "4px",
    borderColor: "#ffffff",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  [IMAGE_FRAME.TILTED_RECTANGLE_VERTICAL]: {
    transform: "rotate(-6deg)",
    aspectRatio: "2/3",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_RECTANGLE_VERTICAL_ROUNDED]: {
    transform: "rotate(-6deg)",
    borderRadius: "0.5rem",
    aspectRatio: "2/3",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_RECTANGLE_VERTICAL_ROUNDED_WITH_FRAME]: {
    transform: "rotate(-6deg)",
    borderRadius: "0.5rem",
    aspectRatio: "2/3",
    objectFit: "cover" as const,
    borderWidth: "4px",
    borderColor: "#ffffff",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  [IMAGE_FRAME.TILTED_RECTANGLE_HORIZONTAL]: {
    transform: "rotate(-6deg)",
    aspectRatio: "3/2",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_RECTANGLE_HORIZONTAL_ROUNDED]: {
    transform: "rotate(-6deg)",
    borderRadius: "0.5rem",
    aspectRatio: "3/2",
    objectFit: "cover" as const,
  },
  [IMAGE_FRAME.TILTED_RECTANGLE_HORIZONTAL_ROUNDED_WITH_FRAME]: {
    transform: "rotate(-6deg)",
    borderRadius: "0.5rem",
    aspectRatio: "3/2",
    objectFit: "cover" as const,
    borderWidth: "4px",
    borderColor: "#ffffff",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
} as const;

export const DEFAULT_SITE_CONFIG: Omit<SiteInsert, "slug" | "userId" | "id"> = {
  version: 0,
  color: COLOR.BLACK,
  backgroundColor: BACKGROUND_COLOR.CREAM,
  textAlign: ALIGNMENT.LEFT,
  fontFamily: FONT_FAMILY.MANROPE,
  fontSize: FONT_SIZE.M,
  content:
    '<p>Hey there! 👋🏻</p><p>This is your site. A space to tell your story.</p><p>You can write <strong>bold</strong> words, <em>italic thoughts</em>, and add <a target="_blank" rel="noopener noreferrer nofollow" class="underline underline-offset-2" href="https://your-link.com">links to your work</a> or social profiles.</p><p>Start by introducing yourself. Who are you? What you do? Let people know!</p>',
  socialIcons: [],
  socialIconsAlignment: ALIGNMENT.LEFT,
  image: null,
  imageAlignment: "left",
  imageFrame: IMAGE_FRAME.SQUARE,
};
