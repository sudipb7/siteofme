export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const WHY_CHOOSE_SITEOF_ME = [
  {
    icon: "⚡",
    title: "Simple & fast",
    description: "Build your personal site in minutes, no technical skills required.",
  },
  {
    icon: "✨",
    title: "Looks professional",
    description: "Clean, modern designs that make you stand out from the crowd.",
  },
  {
    icon: "🔗",
    title: "One link",
    description: "Share your complete online presence with a single, memorable link.",
  },
  {
    icon: "🎯",
    title: "Built for everyone",
    description: "Perfect for creators, professionals, and anyone wanting an online presence.",
  },
];

export const USERNAME_TEXT_STATES = {
  idle: "Claim your username before it's too late!",
  available: "It's available... this username is available! 😃",
  unavailable: "This username is already taken, you're a little late.😐",
  invalid: "5 characters look better as username 🖐",
  special: "You are already so special, why a special character? 😉",
};

export const SITE_CONFIG = {
  name: "siteof.me",
  url: SITE_URL,
  logo: "/logo.png",
  favicon: "/favicon.ico",
  shortDescription: 'Go beyond the links. Tell your "story", beautifully.',
  description:
    'Create a "site of you" — a mini-site built around "you". Not just where to find you, but "who you are".',
  ogImage: `${SITE_URL}/opengraph-image.png`,
  links: {
    twitter: "https://x.com/sudipcodes",
  },
};
