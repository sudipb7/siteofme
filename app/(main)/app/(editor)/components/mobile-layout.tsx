import { User } from "@/db/schema";
import { Editor } from "./editor";
import { PagePreview } from "./page-preview";
import { TABS, type TabType } from "../lib/constants";
import { getContentMinHeight } from "../lib/utils";

interface MobileLayoutProps {
  user: User;
  activeTab: TabType;
}

export const MobileLayout = ({ user, activeTab }: MobileLayoutProps) => {
  const editorHeight = getContentMinHeight(!!user?.emailVerified, true);

  return (
    <div className="flex-1 md:hidden">
      {activeTab === TABS.EDITOR ? (
        <Editor className="max-w-none w-full" style={{ minHeight: editorHeight }} />
      ) : (
        <PagePreview user={user} isMobile />
      )}
    </div>
  );
};
