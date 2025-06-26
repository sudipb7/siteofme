"use client";

import { useState } from "react";
import { User, Site } from "@/db/schema";
import { MobileLayout } from "./components/mobile-layout";
import { DesktopLayout } from "./components/desktop-layout";
import { TabNavigation } from "./components/tab-navigation";
import { StoreHydrator } from "./components/store-hydrator";
import { TABS, type TabType } from "./lib/constants";

interface MainAppPageClientProps {
  user: User;
  site: Site | null;
}

export const MainAppPageClient = ({ user, site }: MainAppPageClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(TABS.PAGE);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <>
      <StoreHydrator site={site} />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <MobileLayout user={user} activeTab={activeTab} site={site} />
      <DesktopLayout user={user} site={site} />
    </>
  );
};
