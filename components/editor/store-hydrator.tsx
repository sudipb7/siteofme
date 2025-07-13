"use client";

import { useEffect } from "react";
import type { Site } from "@/db/schema";
import { useEditorStore } from "@/hooks/stores/editor";

interface StoreHydratorProps {
  site: Site | null;
}

export const StoreHydrator = ({ site }: StoreHydratorProps) => {
  const hydrate = useEditorStore(state => state.hydrate);

  useEffect(() => {
    hydrate(site);
  }, [hydrate, site]);

  return null;
};
