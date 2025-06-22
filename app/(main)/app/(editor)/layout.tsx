import { AppHeader } from "./components/header";

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full w-full">
      <AppHeader />
      {children}
    </div>
  );
}
