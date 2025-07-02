"use client";

import { useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { UsernameForm } from "./username";
import { FullNameForm } from "./full-name";
import { useCurrentUser } from "@/hooks/queries";

export const OnboardingStep = () => {
  const router = useRouter();
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
    } else {
      return null;
    }
  }, [userData]);

  useEffect(() => {
    if (currentOnboardingStep === null && !isLoading) {
      router.push("/app");
    }
  }, [currentOnboardingStep, isLoading, router]);

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
