"use client";

import { useMemo } from "react";

import { UsernameForm } from "./username";
import { FullNameForm } from "./full-name";
import { EmailVerificationMessage } from "./verification";
import { useCurrentUser } from "@/hooks/queries";
import { Loader2 } from "lucide-react";

export const OnboardingStep = () => {
  const { data: userData, isLoading } = useCurrentUser();

  const currentOnboardingStep = useMemo(() => {
    if (!userData || "error" in userData) {
      return null;
    }

    const user = userData.data.user;
    if (!user) {
      return null;
    }

    if (!user.username) {
      return UsernameForm;
    } else if (!user.name) {
      return FullNameForm;
    } else if (!user.emailVerified) {
      return EmailVerificationMessage;
    } else {
      return null;
    }
  }, [userData]);

  if (isLoading) {
    return (
      <main className="min-h-full w-full grid place-items-center">
        <Loader2 className="size-8 animate-spin" />
      </main>
    );
  }

  if (!userData || "error" in userData) {
    return null;
  }

  if (currentOnboardingStep === null) {
    return null;
  }

  const OnboardingStep = currentOnboardingStep;

  return <OnboardingStep user={userData.data.user} />;
};
