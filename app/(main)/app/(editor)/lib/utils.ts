import { LAYOUT_HEIGHTS } from "./constants";

/**
 * Calculates the minimum height for content areas based on layout components
 */
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
