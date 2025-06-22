import Link from "next/link";

import { Header } from "@/components/header";
import { SignInForm } from "./components/form";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Sign in",
  description: "Sign in to your personal mini-site.",
});

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="flex w-full min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center p-4">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <h1 className="heading_secondary">Let&apos;s get back to it!</h1>
            <p className="description">
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
    </>
  );
}
