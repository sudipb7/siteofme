import { User } from "@/db/schema";
import { Editor } from "./editor";
import { PagePreview } from "./page-preview";
import { getContentMinHeight } from "../lib/utils";

interface DesktopLayoutProps {
  user: User;
}

export const DesktopLayout = ({ user }: DesktopLayoutProps) => {
  const contentHeight = getContentMinHeight(!!user?.emailVerified, false);

  return (
    <div
      className="max-md:hidden flex-1 flex"
      style={{ minHeight: contentHeight, maxHeight: contentHeight }}
    >
      <Editor />
      <PagePreview user={user} isMobile={false} />
    </div>
  );
};
