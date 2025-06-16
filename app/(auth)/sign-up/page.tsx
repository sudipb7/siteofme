import { SignUpForm } from "./components/form";

export default function SignUpPage() {
  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <div className="space-y-1">
          <h1 className="heading_primary">Create the &ldquo;site of you&rdquo;</h1>
          <p className="description">
            You are just three empty fields away from creating your own personal mini-site.
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
