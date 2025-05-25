import { currentUser } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import { VerificationAlert } from "./verification-alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkIcon, User } from "lucide-react";

export const AppHeader = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      {!user.emailVerified && <VerificationAlert />}
      <header className="h-14 border-b w-full bg-background sticky top-0 z-30 inset-x-0">
        <div className="min-h-full flex items-center justify-between px-4">
          <div>
            <Link href="/app" className="font-semibold text-sm">
              siteof.me/{user.username}
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            <Button variant="secondary" size="sm">
              <LinkIcon className="size-4" />
            </Button>
            <Button size="sm">Publish</Button>
            <Button variant="secondary" size="sm">
              <User className="size-4" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
