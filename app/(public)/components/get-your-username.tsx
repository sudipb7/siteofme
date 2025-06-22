"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/schemas";
import { AnimatedText } from "@/components/animated-text";
import { AnimatedButton } from "@/components/animated-button";
import { useCheckUsername } from "@/app/(auth)/sign-up/lib/hooks";

const buttonStates = {
  idle: <ArrowRight className="size-4" />,
  loading: <Loader2 className="size-4 animate-spin" />,
};

const textStates = {
  idle: "Claim your username before it's too late!",
  available: "It's available... this username is available! 😃",
  unavailable: "This username is already taken, you're a little late.😐",
  invalid: "5 characters look better as username 🖐",
  special: "You are already so special, why a special character? 😉",
};

export const GetYourUsername = () => {
  const [username, setUsername] = useState("");
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
      const validated = signUpSchema.pick({ username: true }).safeParse({ username });
      if (!validated.success) {
        if (validated.error.errors.some(error => error.message.includes("special"))) {
          setTextState("special");
        } else {
          setTextState("invalid");
        }
        return;
      }

      setButtonState("loading");

      const res = await checkUsername(username);
      if ("error" in res) {
        setIsUsernameAvailable(false);
        setTextState("unavailable");
      } else {
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
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleRedirect]);

  return (
    <div>
      <div
        role="button"
        onFocus={() => inputRef?.current?.focus()}
        tabIndex={0}
        data-unavailable={textState === "unavailable"}
        data-invalid={textState === "invalid" || textState === "special"}
        data-valid={textState === "available"}
        onClick={() => inputRef?.current?.focus()}
        className={cn(
          "rounded-xl py-2 px-2.5 flex items-center gap-x-2 w-fit mt-6 border outline-none transition-all",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[1.5px]",
          "data-[invalid=true]:ring-warning-foreground/20 data-[invalid=true]:border-warning-foreground",
          "data-[unavailable=true]:ring-destructive/20 data-[unavailable=true]:border-destructive",
          "data-[valid=true]:border-success-foreground data-[valid=true]:ring-success-foreground/50"
        )}
      >
        <div className="flex items-center">
          <div className="flex items-center gap-x-1.5">
            <div className="h-8 w-8 relative overflow-hidden">
              <Image src="/logo.png" fill alt="SiteOf Logo" className="object-contain" />
            </div>
            <span className="font-medium text-base">siteof.me/</span>
          </div>
          <input
            ref={inputRef}
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full max-w-xs text-base font-medium outline-none h-full"
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
            textState === "available"
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : "hover:bg-background hover:border-foreground/25"
          )}
          currentState={buttonState}
          states={buttonStates}
          disabled={textState !== "available"}
        />
      </div>
      <AnimatedText
        currentState={textState}
        states={textStates}
        className={cn(
          "description text-sm mt-3",
          textState === "available" && "text-success-foreground",
          textState === "unavailable" && "text-destructive",
          ["invalid", "special"].includes(textState) && "text-warning-foreground"
        )}
      />
    </div>
  );
};
