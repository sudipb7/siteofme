import { User } from "@/db/schema";
import { Editor } from "./editor";
import { PagePreview } from "./page-preview";

interface DesktopLayoutProps {
  user: User;
}

export const DesktopLayout = ({ user }: DesktopLayoutProps) => {
  return (
    <div className="max-md:hidden flex-1 flex">
      <Editor />
      <PagePreview user={user} />
    </div>
  );
};
