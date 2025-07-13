"use client";

import { useState } from "react";
import type { User, Site } from "@/db/schema";
import { TABS, type TabType } from "@/lib/constants/editor";
import { TabNavigation } from "@/components/editor/tab-navigation";
import { StoreHydrator } from "@/components/editor/store-hydrator";
import { DesktopLayout, MobileLayout } from "@/components/editor/layouts";

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
