"use client";

import { toast } from "sonner";
import { useState } from "react";

import { handleClientError } from "@/lib/utils";
import { useResendVerificationMail } from "../../lib/hooks";

export const VerificationAlert = ({
  isInitialEmailVerificationMailExpired,
}: {
  isInitialEmailVerificationMailExpired: boolean;
}) => {
  const [isSent, setIsSent] = useState(false);
  const { mutateAsync: resendVerificationMail, isPending } = useResendVerificationMail();

  async function handleSendVerificationMail() {
    try {
      const res = await resendVerificationMail();
      if (res && "error" in res) {
        handleClientError(res);
        return;
      }
      toast.success(res?.message);
      setIsSent(true);
    } catch (error) {
      handleClientError(error);
    }
  }

  return (
    <div className="w-full bg-warning text-warning-foreground flex items-center justify-center p-2.5 text-center">
      <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
        <p className="font-medium text-sm">
          Please verify your email to publish your site.
          {!isInitialEmailVerificationMailExpired && (
            <span className="max-sm:hidden"> Check your inbox for the verification link.</span>
          )}
        </p>
        {!isSent && (
          <button
            disabled={isPending}
            className="cursor-pointer font-semibold underline underline-offset-2 text-sm disabled:cursor-default disabled:opacity-75 transition-colors"
            onClick={handleSendVerificationMail}
          >
            <span className="sm:hidden">Resend</span>
            <span className="max-sm:hidden">Resend verification email</span>
          </button>
        )}
      </div>
    </div>
  );
};
