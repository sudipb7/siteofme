import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex-1 min-h-full grid place-items-center">
      <Button asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </main>
  );
}
