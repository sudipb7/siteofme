import Link from "next/link";

import { SignInForm } from "./components/form";

export default function SignInPage() {
  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Let&apos;s get back to it!</h1>
          <p className="font-medium text-muted-foreground leading-tight">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline hover:text-foreground transition-colors">
              Create one
            </Link>{" "}
            for free
          </p>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
