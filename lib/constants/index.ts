export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const RESEND_DOMAIN = process.env.NEXT_PUBLIC_RESEND_DOMAIN;

export const WHY_CHOOSE_SITEOF_ME = [
  {
    icon: "⚡",
    title: "Stupid simple",
    description: "Launch your personal site in minutes no tech skills needed.",
  },
  {
    icon: "✨",
    title: "Looks sharp",
    description: "Modern, clean design that helps you stand out, instantly.",
  },
  {
    icon: "🔗",
    title: "One page, your vibe",
    description: "Your profile picture, words, and links all together on a clean, personal page.",
  },
  {
    icon: "🎯",
    title: "Made for everyone",
    description: "Creators, professionals, side-hustlers if you've got a story, siteof.me fits.",
  },
];

export const USERNAME_TEXT_STATES = {
  idle: "Grab your username before it's gone!",
  available: "Nice this one's available! 😃",
  unavailable: "Taken you're a little late. 😐",
  invalid: "Go for at least 3 characters trust us, it looks better. ✨",
  special: "You're already special, no need for fancy symbols 😉",
  reserved: "This username is unavailable",
};

export const SITE_CONFIG = {
  name: "siteof.me",
  url: SITE_URL,
  logo: "/logo.png",
  favicon: "/favicon.ico",
  shortDescription: "You're more than a link. Share your story.",
  description:
    'Forget plain link lists. Create your "site of you" a simple, beautiful mini-site built around who you are, not just where to find you.',
  ogImage: `${SITE_URL}/opengraph-image.png`,
  twitterImage: `${SITE_URL}/twitter-image.png`,
  links: {
    twitter: "https://x.com/sudipcodes",
  },
};

export const RESERVED_SLUG = [
  "blog",
  "contact",
  "faq",
  "pricing",
  "blog",
  "showcase",
  "gallery",
  "sign-in",
  "sign-up",
  "reset-password",
  "forgot-password",
  "activate",
  "onboarding",
  "app",
  "privacy",
  "terms-of-service",
  "terms",
  "dashboard",
  "settings",
  "billing",
  "upgrade",
];
