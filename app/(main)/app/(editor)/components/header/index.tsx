import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { HeaderActions } from "./actions";
import { currentUser } from "@/lib/queries";
// import { VerificationAlert } from "./verification-alert";

export const AppHeader = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      {/* {!user.emailVerified && <VerificationAlert />} */}
      <header className="h-14 border-b w-full bg-background sticky top-0 z-30 inset-x-0">
        <div className="min-h-full flex items-center justify-between px-4">
          <div>
            <Link href="/app" className="flex items-center gap-x-1.5 sm:gap-x-2">
              <Image
                src="/logo.png"
                alt="Siteof Logo"
                width={100}
                height={100}
                priority
                quality={100}
                className="object-contain min-h-9 max-w-9 "
              />
              <span className="font-semibold sm:hidden">siteof.me</span>
              <span className="font-semibold text-sm max-sm:hidden">siteof.me/{user.username}</span>
            </Link>
          </div>
          <HeaderActions user={user} />
        </div>
      </header>
    </>
  );
};
