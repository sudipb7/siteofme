import { AppHeader } from "./components/header";

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full w-full">
      <AppHeader />
      {children}
    </div>
  );
}
