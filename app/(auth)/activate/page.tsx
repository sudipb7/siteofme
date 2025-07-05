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
  description: "Verify your account to start building.",
});

export const dynamic = "force-dynamic";

export default async function AccountActivationPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const user = await currentUser();
  if (user?.emailVerified) {
    redirect("/app");
  }

  const token = (await searchParams).token;
  if (!token) {
    return notFound();
  }

  const verificationToken = await getVerificationTokenByToken(token);
  if (
    !verificationToken ||
    verificationToken.identifier !== user?.email ||
    verificationToken.expires < new Date()
  ) {
    return (
      <main className="flex w-full min-h-dvh flex-col items-center justify-center p-4">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <h1 className="heading_secondary">Uh-oh, something&apos;s off</h1>
            <p className="description">
              Looks like your link expired or broke no worries, grab a new one below.
            </p>
          </div>
          <Button className="w-full" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  await Promise.all([
    updateUser(user.id, { emailVerified: new Date(), email: user.email }),
    db.delete(verificationTokens).where(eq(verificationTokens.token, token)),
  ]);

  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-4">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <div className="space-y-2">
          <h1 className="heading_secondary">You&apos;re all set 🎉</h1>
          <p className="description">Your username&apos;s locked in time to create your site.</p>
        </div>
        <Button className="w-full" asChild>
          <Link href="/app">Start Building</Link>
        </Button>
      </div>
    </main>
  );
}
