import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import {
  BackgroundSection,
  ImageSection,
  SocialIconsSection,
  TextSection,
} from "@/components/editor/sections";
import type { Site } from "@/db/schema";
import { useEditorStore } from "@/hooks/stores/editor";
import { mapSiteToStoreFormat } from "@/lib/utils/site";

interface EditorProps {
  className?: string;
  style?: CSSProperties;
  site: Site | null;
  isMobile?: boolean;
}

export const Editor = ({ className, style, site, isMobile = false }: EditorProps) => {
  const storeState = useEditorStore();

  const getState = () => {
    if (storeState.isHydrated) {
      return storeState;
    }

    const siteData = mapSiteToStoreFormat(site || null);
    return siteData;
  };

  const state = getState();

  return (
    <div
      className={cn(
        "w-full max-w-72 min-h-full bg-background md:border-r overflow-y-auto",
        className
      )}
      style={style}
    >
      <div>
        <BackgroundSection state={state} setBackgroundColor={storeState.setBackgroundColor} />
        <ImageSection
          state={state}
          setImage={storeState.setImage}
          setImageAlignment={storeState.setImageAlignment}
          setImageFrame={storeState.setImageFrame}
          isMobile={isMobile}
        />
        <TextSection
          state={state}
          setFontFamily={storeState.setFontFamily}
          setFontSize={storeState.setFontSize}
          setTextAlign={storeState.setTextAlign}
        />
        <SocialIconsSection
          state={state}
          setSocialIcons={storeState.setSocialIcons}
          setSocialIconsAlignment={storeState.setSocialIconsAlignment}
        />
      </div>
    </div>
  );
};
