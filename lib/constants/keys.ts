// ! Do not change -> Redis key for storing Drafts of Sites
export const SITE = process.env.NODE_ENV === "production" ? "site" : "dev:site";
