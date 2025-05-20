"use client";

import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { useSignIn } from "../../lib/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema, SignInInput } from "@/lib/schemas";

export const SignInForm = ({ className, ...props }: ComponentProps<"div">) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutateAsync: signInUser } = useSignIn();

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: SignInInput) {
    try {
      const res = await signInUser(values);
      if (res && "error" in res) {
        toast.error(res.error);
        return;
      }

      toast.success(res?.message);
      setTimeout(() => {
        router.push("/sign-in/success");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong :(");
    }
  }

  return (
    <div className={cn("grid gap-3", className)} {...props}>
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
                    <Link
                      href="/forgot-password"
                      className="text-sm leading-none underline font-normal text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        className="bg-card placeholder:tracking-tighter rounded-r-none z-10"
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
