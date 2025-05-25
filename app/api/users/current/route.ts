import { withUser } from "@/lib/with-user";
import { NextResponse } from "next/server";

export const GET = withUser(
  async ({ user }) => {
    return NextResponse.json(
      { data: { user }, message: "User fetched successfully" },
      { status: 200 }
    );
  },
  {
    route: "/api/users/current",
    method: "GET",
  }
);
