import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TABS, type TabType } from "../lib/constants";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TAB_CONFIG = [
  { key: TABS.PAGE as TabType, label: "Page" },
  { key: TABS.EDITOR as TabType, label: "Editor" },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="md:hidden flex items-center">
      {TAB_CONFIG.map(({ key, label }) => (
        <Button
          key={key}
          onClick={() => onTabChange(key)}
          variant="ghost"
          className={cn(
            "flex-1 font-semibold rounded-none border-b-2 border-transparent",
            activeTab === key ? "border-foreground/75" : ""
          )}
          size="lg"
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
