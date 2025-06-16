import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LinkIcon, LogOut, Mail, Settings, User } from "lucide-react";

import { signOut } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { VerificationAlert } from "./verification-alert";

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
          <div className="flex items-center gap-x-3">
            <Button variant="secondary" size="sm">
              <LinkIcon className="size-4" />
            </Button>
            <Button size="sm">Publish</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  <User className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <p className="font-medium text-sm px-2 py-1">{user.email}</p>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-foreground">
                  <Settings className="size-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground">
                  <Mail className="size-4" /> Contact us
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button type="submit" className="flex items-center gap-x-2">
                      <LogOut /> <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};
