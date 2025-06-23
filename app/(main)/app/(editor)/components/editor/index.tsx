import { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { BackgroundSection } from "./sections/background-section";
import { TextSection } from "./sections/text-section";

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
      </div>
    </div>
  );
};
