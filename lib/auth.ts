import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import db from "@/db";
import { updateUser } from "@/lib/actions";
import { getUserByEmail, getUserById } from "@/lib/queries";

const OAUTH_OPTIONS = { allowDangerousEmailAccountLinking: true };
const RESEND_OPTIONS = {
  from: `no-reply@${process.env.RESEND_DOMAIN}`,
  apiKey: process.env.RESEND_KEY,
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google(OAUTH_OPTIONS), Github(OAUTH_OPTIONS), Resend(RESEND_OPTIONS)],
  events: {
    async linkAccount({ profile }) {
      if (profile.email) {
        const user = await getUserByEmail(profile.email);
        if (user) {
          await updateUser(user.id, {
            email: profile.email,
            ...(!user.name && profile.name && { name: profile.name }),
            ...(!user.image && profile.image && { image: profile.image }),
          });
        }
      }
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      token.email = user.email;
      token.username = user.username;
      token.name = user.name;
      token.image = user.image;

      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.userId = token.sub;
      }
      if (token.email) {
        session.user.email = token.email;
      }
      session.user.username = token.username as string;
      session.user.name = token.name;
      return session;
    },
  },
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  debug: process.env.NODE_ENV === "development",
});
