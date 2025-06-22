import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth";
import { currentUser } from "@/lib/queries";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function MainAppPage() {
  const user = await currentUser();
  return (
    <main
      className={cn(
        "p-4 w-full",
        user?.emailVerified ? "min-h-[calc(100dvh-3.5rem)]" : "min-h-[calc(100dvh-3.5rem-2.5rem)]"
      )}
    >
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}
      >
        <Button>Sign out</Button>
      </form>
    </main>
  );
}
