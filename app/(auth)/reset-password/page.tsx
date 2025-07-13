import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { generatePageMetadata } from "@/lib/metadata";
import { ResetPasswordForm } from "@/components/auth/forms/reset-password";

export const metadata = generatePageMetadata({
  title: "Reset password",
  description: "Choose a new password.",
});

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className="flex w-full min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center p-4">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <h1 className="heading_secondary">Reset your password</h1>
            <p className="description">Set your new password below.</p>
          </div>
          <ResetPasswordForm token={token} />
        </div>
      </main>
    </>
  );
}
