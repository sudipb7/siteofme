import { User, Site } from "@/db/schema";
import { Editor } from "./editor";
import { PagePreview } from "./page-preview";
import { getContentMinHeight } from "../lib/utils";

interface DesktopLayoutProps {
  user: User;
  site: Site | null;
}

export const DesktopLayout = ({ user, site }: DesktopLayoutProps) => {
  const contentHeight = getContentMinHeight(!!user?.emailVerified, false);

  return (
    <div
      className="max-md:hidden flex-1 flex"
      style={{ minHeight: contentHeight, maxHeight: contentHeight }}
    >
      <Editor site={site} />
      <PagePreview user={user} site={site} isMobile={false} />
    </div>
  );
};
