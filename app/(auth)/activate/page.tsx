import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import db from "@/db";
import { updateUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { verificationTokens } from "@/db/schema";
import { currentUser, getVerificationTokenByToken } from "@/lib/queries";

export default async function AccountActivationPage({
  searchParams,
}: {
  searchParams: Promise<{ key: string }>;
}) {
  const user = await currentUser();
  if (user?.emailVerified) {
    redirect("/app");
  }

  const key = (await searchParams).key;
  if (!key) {
    return notFound();
  }

  const verificationToken = await getVerificationTokenByToken(key);
  if (
    !verificationToken ||
    verificationToken.identifier !== user?.email ||
    verificationToken.expires < new Date()
  ) {
    return (
      <main className="flex w-full min-h-dvh flex-col items-center justify-center p-6">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Oops! Something went wrong</h1>
            <p className="font-medium text-muted-foreground leading-tight">
              Looks like your verification link has expired or isn&apos;t working. No worries though
              - you can try again by requesting a new one.
            </p>
          </div>
          <Button size="lg" className="w-full" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    );
  }

  await Promise.all([
    updateUser(user.id, { emailVerified: new Date() }),
    db.delete(verificationTokens).where(eq(verificationTokens.token, key)),
  ]);

  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">All set! You&apos;ve secured your username!</h1>
          <p className="font-medium text-muted-foreground leading-tight">
            Thanks for verifying your email. Your username is securely yours, and no one else can
            claim it.
          </p>
        </div>
        <Button size="lg" className="w-full" asChild>
          <Link href="/app">Start creating</Link>
        </Button>
      </div>
    </main>
  );
}
