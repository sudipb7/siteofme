import { redirect } from "next/navigation";
import { currentUser } from "@/lib/queries";
import { getSiteByUserId } from "@/lib/queries";
import { MainAppPageClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function MainAppPage() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const site = await getSiteByUserId(user.id);

  return <MainAppPageClient user={user} site={site} />;
}
