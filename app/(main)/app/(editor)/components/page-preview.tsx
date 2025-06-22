import { cn } from "@/lib/utils";
import { User } from "@/db/schema";
import { getContentMinHeight } from "../lib/utils";

interface PagePreviewProps {
  user: User;
  isMobile?: boolean;
  className?: string;
}

export const PagePreview = ({ user, isMobile = false, className }: PagePreviewProps) => {
  return (
    <main
      className={cn(
        "flex-1 p-4 w-full bg-violet-400 flex items-center justify-center",
        getContentMinHeight(!!user?.emailVerified, isMobile),
        className
      )}
    >
      <div className="max-w-sm w-full mx-auto border min-h-96">Page</div>
    </main>
  );
};
