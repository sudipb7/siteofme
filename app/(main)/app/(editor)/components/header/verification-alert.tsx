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
    <div className="w-full h-10 bg-amber-100 border-b flex items-center justify-center">
      <p className="font-medium text-sm">
        Please verify your email to publish your site.
        {!isInitialEmailVerificationMailExpired && " Check your inbox for the verification link."}
      </p>
      {!isSent && (
        <button
          disabled={isPending}
          className="cursor-pointer font-semibold underline underline-offset-2 text-sm p-1 text-primary disabled:cursor-default disabled:opacity-75 transition-colors"
          onClick={handleSendVerificationMail}
        >
          Resend verification email
        </button>
      )}
    </div>
  );
};
