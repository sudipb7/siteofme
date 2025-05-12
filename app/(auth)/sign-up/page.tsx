import { AuthForm } from "../_components";

export default function SignUpPage() {
  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium">
            Create the <span className="font-semibold">site of you</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            You are just three empty fields away from creating your own personal mini-site.
          </p>
        </div>
        <AuthForm mode="sign-up" />
      </div>
    </main>
  );
}
