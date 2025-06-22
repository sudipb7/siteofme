"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { ComponentProps, useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Google } from "@/components/icons";
import { useSignIn } from "../../lib/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn, handleClientError } from "@/lib/utils";
import { signInSchema, SignInInput } from "@/lib/schemas";
import { AnimatedButton } from "@/components/animated-button";

const buttonStates = {
  idle: "Continue with Email",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

export const SignInForm = ({ className, ...props }: ComponentProps<"div">) => {
  const router = useRouter();
  const [isGoogleAuthPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);
  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync: signInUser } = useSignIn();

  const isLoading = form.formState.isSubmitting || isGoogleAuthPending;

  async function onGoogleSignIn() {
    startTransition(() => {
      signIn("google", {
        callbackUrl: "/app",
      });
    });
  }

  async function onSubmit(values: SignInInput) {
    try {
      setButtonState("loading");
      const res = await signInUser(values);
      if (res && "error" in res) {
        setButtonState("idle");
        handleClientError(res);
        return;
      }

      setButtonState("success");

      setTimeout(() => {
        router.push("/app");
      }, 1000);
    } catch (error) {
      handleClientError(error);
      setButtonState("idle");
    }
  }

  return (
    <div className={cn("grid gap-5", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
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
                  <FormLabel className="flex justify-between">
                    Password
                    <Link
                      href="/forgot-password"
                      className="text-sm leading-none underline font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </FormLabel>
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
                        className="absolute inset-y-0 right-0 min-h-full px-3 py-1.5 text-sm text-muted-foreground grid place-items-center hover:text-foreground transition-colors"
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
          <span className="px-2 bg-background text-muted-foreground leading-none">Or</span>
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
