import { User, Site } from "@/db/schema";
import { Editor } from "@/components/editor";
import { getContentMinHeight } from "@/lib/utils/site";
import { TABS, type TabType } from "@/lib/constants/editor";
import { PagePreview } from "@/components/editor/page-preview";

interface MobileLayoutProps {
  user: User;
  site: Site | null;
  activeTab: TabType;
}

export const MobileLayout = ({ user, site, activeTab }: MobileLayoutProps) => {
  const editorHeight = getContentMinHeight(!!user?.emailVerified, true);

  return (
    <div className="flex-1 md:hidden">
      {activeTab === TABS.EDITOR ? (
        <Editor
          className="max-w-none w-full"
          style={{ minHeight: editorHeight }}
          site={site}
          isMobile
        />
      ) : (
        <PagePreview user={user} site={site} isMobile />
      )}
    </div>
  );
};
