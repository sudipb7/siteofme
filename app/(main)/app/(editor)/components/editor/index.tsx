import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface EditorProps {
  className?: string;
  style?: CSSProperties;
}

export const Editor = ({ className, style }: EditorProps) => {
  return (
    <div
      className={cn("w-full max-w-72 min-h-full bg-background border-r", className)}
      style={style}
    >
      Editor
    </div>
  );
};
