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
  S: 16,
  M: 18,
  L: 20,
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
