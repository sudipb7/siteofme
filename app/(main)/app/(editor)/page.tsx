import { redirect } from "next/navigation";

import { MainAppPageClient } from "./page.client";
import { currentUser, getSiteDraftByUserName } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function MainAppPage() {
  const user = await currentUser();
  if (!user || !user.username) {
    return redirect("/sign-in");
  }

  const site = await getSiteDraftByUserName(user.username);

  return <MainAppPageClient user={user} site={site} />;
}
