"use client";

import { useState } from "react";
import { User } from "@/db/schema";
import { MobileLayout } from "./components/mobile-layout";
import { DesktopLayout } from "./components/desktop-layout";
import { TabNavigation } from "./components/tab-navigation";
import { TABS, type TabType } from "./lib/constants";

interface MainAppPageClientProps {
  user: User;
}

export const MainAppPageClient = ({ user }: MainAppPageClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(TABS.PAGE);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 flex flex-col-reverse md:flex-row h-full">
      <MobileLayout user={user} activeTab={activeTab} />
      <DesktopLayout user={user} />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};
