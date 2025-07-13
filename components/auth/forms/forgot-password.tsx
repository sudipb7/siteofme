"use client";

import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ComponentProps, useState } from "react";

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
import { SignInInput, signInSchema } from "@/lib/schemas";
import { useForgotPassword } from "@/hooks/mutations/auth";
import { AnimatedButton } from "@/components/animated-button";

const buttonStates = {
  idle: "Send Reset Link",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

type ForgotPasswordInput = Pick<SignInInput, "email">;

export const ForgotPasswordForm = ({ className, ...props }: ComponentProps<"div">) => {
  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync: forgotPassword } = useForgotPassword();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(signInSchema.pick({ email: true })),
    defaultValues: { email: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: ForgotPasswordInput) {
    try {
      setButtonState("loading");

      const res = await forgotPassword(values);
      if (res && "error" in res) {
        setButtonState("idle");
        handleClientError(res);
        return;
      }

      setButtonState("success");
      setIsSubmitted(true);

      setTimeout(() => {
        setButtonState("idle");
      }, 5000);
    } catch (error) {
      setButtonState("idle");
      handleClientError(error);
    }
  }

  if (isSubmitted) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        <h1 className="heading_secondary">Check your inbox</h1>
        <p className="description">We&apos;ve sent instructions to reset your password.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="space-y-2">
        <h1 className="heading_secondary">Forgot your password?</h1>
        <p className="description">No stress, we&apos;ll help you reset it.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <AnimatedButton
            states={buttonStates}
            currentState={buttonState}
            disabled={isLoading}
            aria-label="Send Reset Link"
            data-success={buttonState === "success"}
            className="w-full data-[success=true]:bg-success-foreground data-[success=true]:text-success"
          />
        </form>
      </Form>
    </div>
  );
};
