"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import confetti from "canvas-confetti";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LinkIcon, Loader2, LogOut, Mail, UserIcon } from "lucide-react";

import type { User } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SITE_CONFIG, SITE_URL } from "@/lib/constants";
import { handleClientError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/animated-button";
import { useEditorStore } from "@/hooks/stores/editor";
import { useResendVerificationMail } from "@/hooks/mutations/auth";
import { usePublishSite } from "@/hooks/mutations/site";

export const HeaderActions = ({ user }: { user: User }) => {
  const router = useRouter();
  const store = useEditorStore();
  const [isSent, setIsSent] = useState(false);
  const { mutateAsync: publishSite, isPending } = usePublishSite();
  const { mutateAsync: resendVerificationMail, isPending: isResendPending } =
    useResendVerificationMail();

  const handleOnLinkCopy = () => {
    navigator.clipboard.writeText(`${SITE_URL}/${user.username}`);
    toast.info("Link copied to clipboard");
  };

  const handleOnLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  const handleSendVerificationMail = async () => {
    try {
      if (isSent) return;
      const res = await resendVerificationMail();
      if (res && "error" in res) {
        handleClientError(res);
        return;
      }
      toast.success(res?.message || "Verification email sent successfully");
      setIsSent(true);
    } catch (error) {
      handleClientError(error);
    }
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
        image: store.image || null,
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
      {!!user?.emailVerified ? (
        <Button size="sm" aria-label="Publish" onClick={handleOnPublish} disabled={isPending}>
          Publish
        </Button>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" aria-label="Publish">
              Publish
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-3">
              <div className="space-y-1 font-medium">
                <p>Verify your email to publish</p>
                <p className="text-sm text-muted-foreground leading-snug">
                  You need to verify your email before your site goes live.
                </p>
              </div>
              <AnimatedButton
                size="sm"
                onClick={handleSendVerificationMail}
                disabled={isResendPending || isSent}
                className={`w-full ${
                  isSent ? "bg-success-foreground text-success hover:bg-success-foreground" : ""
                }`}
                states={{
                  idle: "Send verification email",
                  sending: <Loader2 className="size-4 animate-spin" />,
                  success: "Email sent! Check your inbox.",
                }}
                currentState={isSent ? "success" : isResendPending ? "sending" : "idle"}
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <UserIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <p className="font-medium text-sm px-2 py-1">{user.email}</p>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem className="text-foreground" asChild>
            <Link href="/app/settings">
              <Settings className="size-4" /> Settings
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem className="text-foreground" asChild>
            <Link href={SITE_CONFIG.links.contact} target="_blank">
              <Mail className="size-4" /> Contact us
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleOnLogout}>
            <LogOut className="size-4" /> <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
