import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Header />
      <div className="min-h-[calc(100dvh-3.5rem)]">
        {children}
        <Footer />
      </div>
    </div>
  );
}
