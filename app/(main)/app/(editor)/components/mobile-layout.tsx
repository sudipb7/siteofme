import { User } from "@/db/schema";
import { Editor } from "./editor";
import { PagePreview } from "./page-preview";
import { TABS, type TabType } from "../lib/constants";

interface MobileLayoutProps {
  user: User;
  activeTab: TabType;
}

export const MobileLayout = ({ user, activeTab }: MobileLayoutProps) => {
  return (
    <div className="flex-1 md:hidden">
      {activeTab === TABS.EDITOR ? <Editor /> : <PagePreview user={user} isMobile />}
    </div>
  );
};
