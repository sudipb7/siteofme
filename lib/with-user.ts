import { NextRequest, NextResponse } from "next/server";

import { User } from "@/db/schema";
import { currentUser } from "@/lib/queries";
import { getSearchParams } from "@/lib/utils";

export type WithUserHandler = ({
  searchParams,
  params,
  user,
  req,
}: {
  req: NextRequest;
  params: Record<string, string>;
  searchParams: Record<string, string>;
  user: User;
}) => Promise<NextResponse>;

export type WithUserMetadata = {
  route: string;
  method: string;
};

export function withUser(handler: WithUserHandler, metadata: WithUserMetadata) {
  return async function (req: NextRequest, { params }: { params: Record<string, string> }) {
    const searchParams = getSearchParams(req.url);

    try {
      const user = await currentUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      return await handler({ req, params, searchParams, user });
    } catch (error) {
      console.error(`[ERROR] >> ${metadata.method.toUpperCase()}: ${metadata.route}\n`, error);
      return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
    }
  };
}
