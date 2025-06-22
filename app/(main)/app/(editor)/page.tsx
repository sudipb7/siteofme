import { currentUser } from "@/lib/queries";
import { MainAppPageClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function MainAppPage() {
  const user = await currentUser();
  return <MainAppPageClient user={user!} />;
}
