import { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { BackgroundSection } from "./sections/background-section";
import { TextSection } from "./sections/text-section";
import { SocialIconsSection } from "./sections/social-icons-section";
import { Site } from "@/db/schema";
import { useEditorStore } from "../../lib/store";
import { mapSiteToStoreFormat } from "../../lib/utils";

interface EditorProps {
  className?: string;
  style?: CSSProperties;
  site: Site | null;
}

export const Editor = ({ className, style, site }: EditorProps) => {
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
      className={cn("w-full max-w-72 min-h-full bg-background border-r overflow-y-auto", className)}
      style={style}
    >
      <div>
        <BackgroundSection state={state} setBackgroundColor={storeState.setBackgroundColor} />
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
