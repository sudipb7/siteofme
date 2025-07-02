export const TABS = {
  EDITOR: "editor",
  PAGE: "page",
} as const;

export type TabType = (typeof TABS)[keyof typeof TABS];

export const LAYOUT_HEIGHTS = {
  HEADER: "3.5rem",
  VERIFICATION_ALERT: "0rem",
  // VERIFICATION_ALERT: "2.5rem",
  TAB_BAR: "2.5rem",
} as const;
