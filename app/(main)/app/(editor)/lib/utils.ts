import { LAYOUT_HEIGHTS } from "./constants";

/**
 * Calculates the minimum height for content areas based on layout components
 */
export const getContentMinHeight = (isEmailVerified: boolean, isMobile: boolean = false) => {
  const baseHeight = `100dvh-${LAYOUT_HEIGHTS.HEADER}`;

  if (isMobile) {
    return isEmailVerified
      ? `min-h-[calc(${baseHeight}-${LAYOUT_HEIGHTS.TAB_BAR})]`
      : `min-h-[calc(${baseHeight}-${LAYOUT_HEIGHTS.TAB_BAR}-${LAYOUT_HEIGHTS.VERIFICATION_ALERT})]`;
  }

  return isEmailVerified
    ? `min-h-[calc(${baseHeight})]`
    : `min-h-[calc(${baseHeight}-${LAYOUT_HEIGHTS.VERIFICATION_ALERT})]`;
};
