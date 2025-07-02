import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import db from "@/db";
import { updateUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { verificationTokens } from "@/db/schema";
import { generatePageMetadata } from "@/lib/metadata";
import { currentUser, getVerificationTokenByToken } from "@/lib/queries";

export const metadata = generatePageMetadata({
  title: "Activate your account",
  description: "Activate your account to get started.",
});

export const dynamic = "force-dynamic";

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
      <main className="flex w-full min-h-dvh flex-col items-center justify-center p-4">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <h1 className="heading_secondary">Oops! Something went wrong</h1>
            <p className="description">
              Looks like your verification link has expired or isn&apos;t working. No worries though
              - you can try again by requesting a new one.
            </p>
          </div>
          <Button className="w-full" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    );
  }

  await Promise.all([
    updateUser(user.id, { emailVerified: new Date(), email: user.email }),
    db.delete(verificationTokens).where(eq(verificationTokens.token, key)),
  ]);

  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-4">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <div className="space-y-2">
          <h1 className="heading_secondary">Your account is now verified 🎉</h1>
          <p className="description">
            Your username is now yours. You can start creating your site now.
          </p>
        </div>
        <Button className="w-full" asChild>
          <Link href="/app">Start creating</Link>
        </Button>
      </div>
    </main>
  );
}
