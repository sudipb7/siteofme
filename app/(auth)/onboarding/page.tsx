import { generatePageMetadata } from "@/lib/metadata";
import { OnboardingStep } from "./components/onboarding-step";

export const metadata = generatePageMetadata({
  title: "Just a few more steps",
  description: "Complete your profile to get started.",
});

export default async function OnboardingPage() {
  return (
    <main className="flex w-full min-h-dvh flex-col items-center justify-center p-4">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full max-w-sm">
        <OnboardingStep />
      </div>
    </main>
  );
}
