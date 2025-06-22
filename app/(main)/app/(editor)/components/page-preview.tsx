import { cn } from "@/lib/utils";
import { User } from "@/db/schema";
import { getContentMinHeight } from "../lib/utils";
import { useEditorStore } from "../lib/store";

interface PagePreviewProps {
  user: User;
  isMobile?: boolean;
  className?: string;
}

export const PagePreview = ({ user, isMobile = false, className }: PagePreviewProps) => {
  const { backgroundColor, color, fontSize, fontFamily } = useEditorStore();

  return (
    <main
      style={{
        backgroundColor,
        color,
        fontSize: `${fontSize}px`,
        fontFamily: `var(--font-${fontFamily})`,
        minHeight: getContentMinHeight(!!user?.emailVerified, isMobile),
      }}
      className={cn("flex-1 p-4 w-full flex font-medium items-center justify-center", className)}
    >
      <div className="max-w-sm w-full mx-auto border min-h-96">Page</div>
    </main>
  );
};
