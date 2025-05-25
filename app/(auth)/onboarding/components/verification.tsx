import { User } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface EmailVerificationMessageProps {
  user: User;
}

export const EmailVerificationMessage = ({ user }: EmailVerificationMessageProps) => {
  const router = useRouter();

  function handleOnClick() {
    router.push("/app");
  }

  useEffect(() => {
    if (user.emailVerified) {
      router.push("/app");
    }
  }, [user.emailVerified, router]);

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Hi {user.name}!
          <br />
          Verify, and it&apos;s yours.
        </h1>
        <p className="font-medium text-muted-foreground leading-tight">
          You have 48 hours to verify your account by clicking the link sent to your email
        </p>
      </div>
      <Button size="lg" className="w-full" onClick={handleOnClick}>
        Start creating
      </Button>
    </>
  );
};
