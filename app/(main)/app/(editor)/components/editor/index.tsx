import { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { BackgroundSection } from "./sections/background-section";
import { TextSection } from "./sections/text-section";
import { SocialIconsSection } from "./sections/social-icons-section";

interface EditorProps {
  className?: string;
  style?: CSSProperties;
}

export const Editor = ({ className, style }: EditorProps) => {
  return (
    <div
      className={cn("w-full max-w-72 min-h-full bg-background border-r overflow-y-auto", className)}
      style={style}
    >
      <div>
        <BackgroundSection />
        <TextSection />
        <SocialIconsSection />
      </div>
    </div>
  );
};
