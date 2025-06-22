import { Header } from "@/components/header";
import { generatePageMetadata } from "@/lib/metadata";
import { ForgotPasswordForm } from "./components/form";

export const metadata = generatePageMetadata({
  title: "Forgot password",
  description: "Forgot your password? We'll help you reset it.",
});

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="flex w-full min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center p-4">
        <div className="mx-auto w-full max-w-sm">
          <ForgotPasswordForm />
        </div>
      </main>
    </>
  );
}
