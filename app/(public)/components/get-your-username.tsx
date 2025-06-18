"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/animated-text";
import { AnimatedButton } from "@/components/animated-button";
import { useCheckUsername } from "@/app/(auth)/sign-up/lib/hooks";

const buttonStates = {
  idle: <ArrowRight className="size-4" />,
  loading: <Loader2 className="size-4 animate-spin" />,
};

const textStates = {
  idle: "Claim your username before it’s too late!",
  available: "It’s available... this username is available! 😃",
  unavailable: "This username is already taken, you’re a little late.😐",
  invalid: "5 characters look better as username 🖐",
};

export const GetYourUsername = () => {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [textState, setTextState] = useState<keyof typeof textStates>("idle");
  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: checkUsername, isPending: isCheckingUsername } = useCheckUsername();

  const handleRedirect = useCallback(() => {
    if (isCheckingUsername || !username || !isUsernameAvailable) return;

    router.push("/sign-up?slug=" + username);
  }, [isCheckingUsername, username, isUsernameAvailable, router]);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleRedirect();
  };

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username.length < 5) {
        setTextState("invalid");
        return;
      }

      setButtonState("loading");

      const res = await checkUsername(username);
      if ("error" in res) {
        setIsUsernameAvailable(false);
        setIsValid(false);
        setTextState("unavailable");
      } else {
        setIsValid(true);
        setIsUsernameAvailable(true);
        setTextState("available");
      }

      setButtonState("idle");
    };

    const timeout = setTimeout(() => {
      if (username) {
        checkUsernameAvailability();
      } else {
        setTextState("idle");
      }
    }, 350);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleRedirect();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleRedirect]);

  return (
    <div>
      <div
        onClick={() => inputRef?.current?.focus()}
        className="rounded-2xl py-2.5 px-4 flex items-center gap-x-2 mx-auto w-fit mt-8 border shadow-sm hover:border-foreground/25 focus-within:border-foreground/25 focus-visible:border-foreground/25 transition-all"
      >
        <div className="flex items-center">
          <div className="flex items-center gap-x-1.5">
            <div className="h-10 w-10 relative overflow-hidden">
              <Image src="/logo.png" fill alt="SiteOf Logo" className="object-contain" />
            </div>
            <span className="font-medium text-lg">siteof.me/</span>
          </div>
          <input
            ref={inputRef}
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full max-w-xs text-lg font-medium outline-none h-full"
            placeholder="username"
            autoComplete="username"
            autoCapitalize="off"
          />
        </div>
        <AnimatedButton
          size="icon"
          onClick={handleOnClick}
          variant="secondary"
          className={cn(
            "border bg-background disabled:!opacity-75",
            isValid && !isCheckingUsername
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : "hover:bg-background hover:border-foreground/25"
          )}
          currentState={buttonState}
          states={buttonStates}
          disabled={isCheckingUsername || !isValid || !username}
        />
      </div>
      <AnimatedText
        currentState={textState}
        states={textStates}
        className={cn(
          "description mt-3",
          textState === "available" && "text-green-600",
          textState === "unavailable" && "text-destructive",
          textState === "invalid" && "text-destructive"
        )}
      />
    </div>
  );
};
