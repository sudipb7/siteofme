"use client";

import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, useEffect, useState } from "react";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useSignUp } from "../../lib/hooks";
import { Google } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useCheckUsername } from "../lib/hooks";
import { Button } from "@/components/ui/button";
import type { BaseAPIResponse } from "@/types";
import { signUpSchema, type SignUpInput } from "@/lib/schemas";

export const SignUpForm = ({ className, ...props }: ComponentProps<"div">) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [usernameResponse, setUsernameResponse] = useState<BaseAPIResponse | null>(null);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", username: "", password: "" },
  });

  const { mutateAsync: registerUser } = useSignUp();

  const username = form.watch("username");
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: SignUpInput) {
    try {
      if (!isUsernameAvailable) {
        toast.error("The username is already claimed. Try another one.");
        return;
      }

      const res = await registerUser(values);
      if (res && "error" in res) {
        toast.error(res.error);
        return;
      }

      toast.success(res?.message);
      setTimeout(() => {
        router.push("/sign-up/success");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong :(");
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
    <div className={cn("grid gap-3", className)} {...props}>
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
                    <div className="flex">
                      <div className="min-h-full px-3 py-1.5 bg-accent border border-r-0 border-input rounded-l-md text-sm text-muted-foreground grid place-items-center">
                        thesiteof.me/
                      </div>
                      <Input
                        className="bg-card rounded-l-none"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        className="bg-card placeholder:tracking-tighter rounded-r-none z-10 data-[show-password=false]:tracking-tighter"
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
                        className="min-h-full px-3 py-1.5 bg-accent border border-l-0 border-input rounded-r-md text-sm text-muted-foreground grid place-items-center"
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
          <Button size="lg" type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Continue with email
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
