import { relations } from "drizzle-orm";
import { AdapterAccountType } from "next-auth/adapters";
import { pgTable, text, timestamp, integer, primaryKey, jsonb, pgEnum } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  usernameVerified: timestamp("username_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  ...timestamps,
});

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sites: many(sites),
}));

export type UserInsert = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
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
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  verificationToken => ({
    compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
  })
);

export const sizeEnum = pgEnum("size_enum", ["S", "M", "L"]);
export const alignmentEnum = pgEnum("alignment_enum", ["left", "center", "right"]);

export const sites = pgTable("sites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  version: integer("version").notNull().default(0),
  color: text("color").notNull(),
  backgroundColor: text("background_color").notNull(),
  textAlign: alignmentEnum("text_align").notNull(),
  fontFamily: text("font_family").notNull(),
  fontSize: sizeEnum("font_size").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  imageFrame: text("image_frame").notNull(),
  imageAlignment: alignmentEnum("image_alignment").notNull(),
  socialIcons: jsonb("social_icons").notNull().default([]),
  socialIconsAlignment: alignmentEnum("social_icons_alignment").notNull(),
  ...timestamps,
});

export const siteRelations = relations(sites, ({ one }) => ({
  user: one(users, {
    fields: [sites.userId],
    references: [users.id],
  }),
}));

export type Site = typeof sites.$inferSelect;
export type SiteInsert = typeof sites.$inferInsert;
