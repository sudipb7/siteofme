import { NextResponse } from "next/server";

import { Site } from "@/db/schema";
import { redis } from "@/lib/redis";
import { getZodError } from "@/lib/utils";
import { withUser } from "@/lib/with-user";
import { updateSiteSchema } from "@/lib/schemas";

export const GET = withUser(
  async ({ user }) => {
    const siteDraft = await redis.get(`site:${user.username}`);
    if (!siteDraft) {
      return NextResponse.json({ error: "Site draft not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { siteDraft } }, { status: 200 });
  },
  {
    method: "GET",
    route: "/api/sites/drafts",
  }
);

export const PATCH = withUser(
  async ({ req, user }) => {
    const body = await req.json();
    const validated = updateSiteSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: getZodError(validated.error) }, { status: 400 });
    }

    const { slug, userId, ...rest } = validated.data;

    const siteDraft = (await redis.get(`site:${slug}`)) as Site | null;
    if (!siteDraft) {
      return NextResponse.json({ error: "Site draft not found" }, { status: 404 });
    }
    if (siteDraft.slug !== slug || siteDraft.userId !== userId || user.username !== slug) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedSite = { ...siteDraft, ...rest };

    await redis.set(`site:${slug}`, JSON.stringify(updatedSite));

    return NextResponse.json({ message: "Site draft updated successfully" }, { status: 200 });
  },
  {
    method: "PATCH",
    route: "/api/sites/drafts",
  }
);
