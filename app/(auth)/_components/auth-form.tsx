"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ComponentProps, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Google } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authSchema, AuthInput } from "@/lib/schemas";

interface AuthFormProps extends ComponentProps<"div"> {
  mode: "sign-in" | "sign-up";
}

export const AuthForm = ({ className, mode, ...props }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: AuthInput) {
    console.log(values);
  }

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-card"
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
                  {mode === "sign-in" ? (
                    <Link
                      href="/forgot-password"
                      className="underline font-normal text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot password?
                    </Link>
                  ) : (
                    <span className="text-muted-foreground font-normal">At least 8 characters</span>
                  )}
                </FormLabel>
                <FormControl>
                  <span className="relative block">
                    <Input
                      className="bg-card"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-1 inset-y-0 h-full px-2"
                    >
                      {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                    </button>
                  </span>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="lg" type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {mode === "sign-in"
              ? isLoading
                ? "Signing in..."
                : "Sign in"
              : mode === "sign-up" && isLoading
                ? "Signing up..."
                : "Sign up"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground bg-background">Or</span>
        </div>
      </div>
      <Button
        type="button"
        size="lg"
        variant="outline"
        onClick={() => {
          signIn("google");
        }}
        disabled={isLoading}
      >
        <Google className="h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
};
