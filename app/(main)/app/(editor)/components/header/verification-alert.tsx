"use client";

import { toast } from "sonner";
import { useState } from "react";

import { handleClientError } from "@/lib/utils";
import { useResendVerificationMail } from "../../lib/hooks";

export const VerificationAlert = () => {
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
    <div className="w-full h-10 bg-amber-100 flex items-center justify-center">
      <p className="font-medium text-sm">
        To avoid deleting the account, verify it by clicking the link we&apos;ve sent to your email.
      </p>{" "}
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
