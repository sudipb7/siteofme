import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MainAppPage() {
  return (
    <main className="min-h-full p-6 w-full">
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/sign-in");
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
