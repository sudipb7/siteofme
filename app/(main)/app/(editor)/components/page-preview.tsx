import { cn } from "@/lib/utils";
import { User } from "@/db/schema";
import { useEditorStore } from "../lib/store";
import { getContentMinHeight } from "../lib/utils";

interface PagePreviewProps {
  user: User;
  isMobile?: boolean;
  className?: string;
}

export const PagePreview = ({ user, isMobile = false, className }: PagePreviewProps) => {
  const { backgroundColor, color, fontSize, fontFamily, textAlign } = useEditorStore();

  return (
    <main
      style={{
        backgroundColor,
        color,
        fontSize: `${fontSize}px`,
        fontFamily: `var(--font-${fontFamily})`,
        textAlign,
        minHeight: getContentMinHeight(!!user?.emailVerified, isMobile),
      }}
      className={cn("flex-1 p-4 w-full flex font-medium items-center justify-center", className)}
    >
      <div className="max-w-sm w-full mx-auto space-y-4">
        <p>Hey there, I am John Doe.</p>
        <p>
          I am a full-time Software Engineer and part-time Indie Hacker with strong design sense.
        </p>
        <p>Don&apos;t forget to visit my portfolio and X.</p>
      </div>
    </main>
  );
};
