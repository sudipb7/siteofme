"use client";

import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { ComponentProps, useEffect, useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignUp } from "../../lib/hooks";
import { Google } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useCheckUsername } from "../lib/hooks";
import { Button } from "@/components/ui/button";
import type { BaseAPIResponse } from "@/types";
import { cn, handleClientError } from "@/lib/utils";
import { AnimatedButton } from "@/components/animated-button";
import { signUpSchema, type SignUpInput } from "@/lib/schemas";

const buttonStates = {
  idle: "Continue with Email",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

export const SignUpForm = ({
  className,
  slug,
  ...props
}: ComponentProps<"div"> & { slug?: string }) => {
  const router = useRouter();
  const [isGoogleAuthPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");
  const [usernameResponse, setUsernameResponse] = useState<BaseAPIResponse | null>(null);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", username: slug || "", password: "" },
  });

  const { mutateAsync: registerUser } = useSignUp();

  const username = form.watch("username");
  const isLoading = form.formState.isSubmitting || isGoogleAuthPending;

  async function onGoogleSignIn() {
    startTransition(() => {
      signIn("google", {
        callbackUrl: "/onboarding",
      });
    });
  }

  async function onSubmit(values: SignUpInput) {
    try {
      if (!isUsernameAvailable) {
        toast.error("The username is already claimed. Try another one.");
        return;
      }

      setButtonState("loading");

      const res = await registerUser(values);
      if (res && "error" in res) {
        setButtonState("idle");
        handleClientError(res);
        return;
      }

      setButtonState("success");

      setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
    } catch (error) {
      handleClientError(error);
      setButtonState("idle");
    }
  }

  const { mutateAsync: checkUsername, isPending: isCheckingUsername } = useCheckUsername();

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      const result = await form.trigger("username");
      if (!result) {
        return;
      }

      const res = await checkUsername(username);
      if ("error" in res) {
        form.setError("username", { message: res.error, type: "pattern" }, { shouldFocus: true });
        setIsUsernameAvailable(false);
        setUsernameResponse(res);
        return;
      } else {
        setIsUsernameAvailable(true);
        setUsernameResponse(res);
      }
    };

    const timeout = setTimeout(() => {
      if (username && username.length >= 3) {
        checkUsernameAvailability();
      } else {
        setIsUsernameAvailable(false);
        setUsernameResponse(null);
      }
    }, 350);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [username]);

  return (
    <div className={cn("grid gap-5", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between gap-x-2">
                    Username
                    {username.length >= 3 ? (
                      isCheckingUsername ? (
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-x-1 leading-none">
                          Checking...
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                        </span>
                      ) : usernameResponse && "error" in usernameResponse ? (
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-x-1 leading-none">
                          {usernameResponse.error}
                          <X className="h-3.5 w-3.5 text-red-600" />
                        </span>
                      ) : usernameResponse && "message" in usernameResponse ? (
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-x-1 leading-none">
                          {usernameResponse?.message}
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        </span>
                      ) : null
                    ) : null}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="text-sm min-h-full absolute inset-y-0 left-0 grid place-items-center pl-3 pointer-events-none leading-none">
                        siteof.me/
                      </span>
                      <Input
                        className="pl-[4.8rem]"
                        placeholder="username"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-9 placeholder:tracking-tighter data-[show-password=false]:tracking-tighter"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        data-show-password={showPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute inset-y-0 right-0 min-h-full rounded-md px-3 py-1.5 text-sm text-muted-foreground grid place-items-center hover:text-foreground outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all"
                      >
                        {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AnimatedButton
            states={buttonStates}
            currentState={buttonState}
            disabled={isLoading}
            aria-label="Continue with Email"
            className="w-full"
          />
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground bg-background leading-none">Or</span>
        </div>
      </div>
      <Button type="button" variant="outline" onClick={onGoogleSignIn} disabled={isLoading}>
        {isGoogleAuthPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Google className="size-4" />
        )}
        Continue with Google
      </Button>
    </div>
  );
};
