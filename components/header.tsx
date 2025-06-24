import Link from "next/link";
import Image from "next/image";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur-sm h-14">
      <div className="max-w-lg mx-auto px-4 h-full w-full">
        <nav className="flex items-center justify-between h-full gap-x-2">
          <Link href="/" className="flex items-center gap-x-1.5">
            <Image
              src="/logo.png"
              alt="Siteof Logo"
              width={100}
              height={100}
              priority
              quality={100}
              className="object-contain min-h-9 max-w-9 "
            />
            <span className="font-medium text-lg">siteof.me</span>
          </Link>
          <div className="flex items-center gap-x-3">
            {session?.user?.id ? (
              <Button size="sm" asChild>
                <Link href="/app">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="sm" variant="outline">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">Create Profile</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
