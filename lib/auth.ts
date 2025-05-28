import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import db from "@/db";
import { updateUser } from "@/lib/actions";
import { signInSchema } from "@/lib/schemas";
import { users, accounts } from "@/db/schema";
import { getUserByEmail, getUserById } from "@/lib/queries";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      async authorize(credentials) {
        const validated = signInSchema.safeParse(credentials);
        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
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
    async signIn({ account, user }) {
      if (account?.provider === "credentials") return;
      if (user?.id) {
        await updateUser(user.id, { emailVerified: new Date() });
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
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      if (!existingUser) {
        return false;
      }

      return true;
    },
  },
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
});
