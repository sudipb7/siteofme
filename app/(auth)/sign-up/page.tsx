import { Header } from "@/components/header";
import { generatePageMetadata } from "@/lib/metadata";
import { SignUpForm } from "@/components/auth/forms/sign-up";

export const metadata = generatePageMetadata({
  title: "Sign up",
  description: "Build your personal mini-site.",
});

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ slug: string }>;
}) {
  const { slug } = await searchParams;

  return (
    <>
      <Header />
      <main className="flex w-full min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center p-4">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <h1 className="heading_secondary">Create your “site of you”</h1>
            <p className="description">
              You&apos;re just a few quick steps from launching your own space online.
            </p>
          </div>
          <SignUpForm slug={slug} />
        </div>
      </main>
    </>
  );
}
