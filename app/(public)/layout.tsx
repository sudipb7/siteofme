import React from "react";
import { Header } from "@/components/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Header />
      <div className="min-h-[calc(100dvh-3.5rem)]">{children}</div>
    </div>
  );
}
