import { LogOut } from "lucide-react";

import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MainAppPage() {
  const user = await currentUser();
  return (
    <main
      className={cn("p-6 w-full", user?.emailVerified ? "min-h-full" : "min-h-[calc(100dvh-3rem)]")}
    >
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}
      >
        <Button>
          <LogOut className="size-4" />
          Sign out
        </Button>
      </form>
    </main>
  );
}
