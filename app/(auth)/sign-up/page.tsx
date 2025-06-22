import { Header } from "@/components/header";
import { SignUpForm } from "./components/form";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Sign up",
  description: "Create your own personal mini-site.",
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
        <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-md">
          <div className="space-y-2">
            <h1 className="heading_secondary">Create the &ldquo;site of you&rdquo;</h1>
            <p className="description">
              You are just three empty fields away from creating your own personal mini-site.
            </p>
          </div>
          <SignUpForm slug={slug} />
        </div>
      </main>
    </>
  );
}
