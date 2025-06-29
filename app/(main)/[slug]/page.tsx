import { Metadata } from "next";
import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/lib/metadata";
import { DashboardPrompt } from "./components/dashboard-prompt";
import { PublicSiteContent } from "./components/public-site-content";
import { getSiteBySlug, getUserById, currentUser } from "@/lib/queries";

interface PublicSitePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PublicSitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);

  if (!site) {
    return generatePageMetadata({
      title: "Site not found",
      description: "The requested site could not be found.",
    });
  }

  const user = await getUserById(site.userId);

  if (!user) {
    return generatePageMetadata({
      title: "Site not found",
      description: "The requested site could not be found.",
    });
  }

  const textContent = site.content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 160);

  const title = user.name ? `${user.name} (@${user.username})` : `@${user.username}`;
  const description =
    textContent || `Visit ${user.name || user.username}'s personal site on siteof.me`;

  return generatePageMetadata({
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${slug}`,
    },
  });
}

export default async function PublicSitePage({ params }: PublicSitePageProps) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  const user = await currentUser();
  const isOwner = user?.id === site.userId;

  if (isOwner && site.version === 0) {
    return <DashboardPrompt />;
  }

  if ((!user || !isOwner) && site.version === 0) {
    notFound();
  }

  return <PublicSiteContent site={site} />;
}
