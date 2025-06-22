"use client";

import Link from "next/link";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { LinkIcon, LogOut, Mail, Settings, UserIcon } from "lucide-react";

import { User } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const HeaderActions = ({ user }: { user: User }) => {
  const handleOnLinkCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}/${user.username}`);
    toast.info("Link copied to clipboard");
  };

  const handleOnLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="flex items-center gap-x-3">
      <Button variant="secondary" size="sm" onClick={handleOnLinkCopy} aria-label="Copy link">
        <LinkIcon className="size-4" />
      </Button>
      <Button size="sm" aria-label="Publish">
        Publish
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <UserIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <p className="font-medium text-sm px-2 py-1">{user.email}</p>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-foreground" asChild>
            <Link href="/app/settings">
              <Settings className="size-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-foreground">
            <Mail className="size-4" /> Contact us
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleOnLogout}>
            <LogOut className="size-4" /> <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
