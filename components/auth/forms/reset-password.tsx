"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ComponentProps, useState } from "react";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, handleClientError } from "@/lib/utils";
import { useResetPassword } from "@/hooks/mutations/auth";
import { AnimatedButton } from "@/components/animated-button";
import { signInSchema, type SignInInput } from "@/lib/schemas";

const buttonStates = {
  idle: "Continue with Email",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

export const ResetPasswordForm = ({
  className,
  token,
  ...props
}: ComponentProps<"div"> & { token: string }) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");

  const form = useForm<Pick<SignInInput, "password">>({
    resolver: zodResolver(signInSchema.pick({ password: true })),
    defaultValues: { password: "" },
  });

  const { mutateAsync: resetPassword } = useResetPassword();

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: Pick<SignInInput, "password">) {
    try {
      setButtonState("loading");
      const res = await resetPassword({
        password: values.password,
        token,
      });
      if (res && "error" in res) {
        setButtonState("idle");
        handleClientError(res);
        return;
      }

      setButtonState("success");

      setTimeout(() => {
        router.push("/app");
      }, 500);
    } catch (error) {
      handleClientError(error);
      setButtonState("idle");
    }
  }

  return (
    <div className={cn("grid gap-5", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">Password</FormLabel>
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
          <AnimatedButton
            states={buttonStates}
            currentState={buttonState}
            disabled={isLoading}
            aria-label="Reset password"
            data-success={buttonState === "success"}
            className="w-full data-[success=true]:bg-success-foreground data-[success=true]:text-success"
          />
        </form>
      </Form>
    </div>
  );
};
