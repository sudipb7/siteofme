import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

const timestamps = {
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }).notNull().defaultNow(),
};

export const users = pgTable("users", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text(),
  username: text().unique(),
  email: text().unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
  password: text(),
  ...timestamps,
});

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export type UserInsert = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const accounts = pgTable(
  "accounts",
  {
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text().$type<AdapterAccountType>().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: text(),
    scope: text(),
    id_token: text(),
    session_state: text(),
    ...timestamps,
  },
  account => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp({ mode: "date" }).notNull(),
  },
  verificationToken => ({
    compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
  })
);
