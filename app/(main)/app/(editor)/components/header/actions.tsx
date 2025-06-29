"use client";

import Link from "next/link";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LinkIcon, LogOut, Mail, Settings, UserIcon } from "lucide-react";

import type { User } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE_URL } from "@/lib/constants";
import { handleClientError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "../../lib/store";
import { usePublishSite } from "../../lib/hooks";

export const HeaderActions = ({ user }: { user: User }) => {
  const router = useRouter();
  const store = useEditorStore();
  const { mutateAsync: publishSite, isPending } = usePublishSite();

  const handleOnLinkCopy = () => {
    navigator.clipboard.writeText(`${SITE_URL}/${user.username}`);
    toast.info("Link copied to clipboard");
  };

  const handleOnLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  const handleOnPublish = async () => {
    try {
      const payload = {
        backgroundColor: store.backgroundColor,
        color: store.color,
        content: store.content,
        fontFamily: store.fontFamily,
        fontSize: store.fontSize,
        id: store.id,
        slug: store.slug,
        socialIcons: store.socialIcons,
        socialIconsAlignment: store.socialIconsAlignment,
        version: store.version,
        textAlign: store.textAlign,
        userId: store.userId,
        imageFrame: store.imageFrame,
        imageAlignment: store.imageAlignment,
        image: store.image,
      };
      const response = await publishSite(payload);
      if ("error" in response) {
        handleClientError(response.error);
        return;
      }
      if (store.version === 0) {
        confetti({
          particleCount: 400,
          spread: 300,
          gravity: 0.7,
          origin: { y: 0.5, x: 0.5 },
        });
      }
      store.setVersion(payload.version + 1);
      router.refresh();
      toast.success("Your site is published successfully");
    } catch (error) {
      handleClientError(error);
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <Button variant="secondary" size="sm" onClick={handleOnLinkCopy} aria-label="Copy link">
        <LinkIcon className="size-4" />
      </Button>
      <Button size="sm" aria-label="Publish" onClick={handleOnPublish} disabled={isPending}>
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
