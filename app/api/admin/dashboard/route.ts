import { NextResponse } from "next/server";

import {
  getTotalUsersCount,
  getUsersWithSitesCount,
  getOnboardedUsersCount,
  getTotalSitesCount,
  getTotalNumberOfSitesPublished,
  getTotalSitesPublished,
  getUsersWithPublishedSitesCount,
  getUserSignupsInTimeRange,
  getNumberOfSitesPublishedInTimeRange,
  getTotalSitesPublishedInTimeRange,
} from "@/lib/queries";
import { withUser } from "@/lib/with-user";
import { ADMIN_USERNAME } from "@/lib/constants";

export const GET = withUser(
  async ({ user }) => {
    if (user.username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalUsers,
      usersWithSites,
      onboardedUsers,
      totalSites,
      totalNumberOfSitesPublished,
      totalSitesPublished,
      usersWithPublishedSites,
      signupsLast24h,
      signupsLastWeek,
      numberOfSitesPublishedLast24h,
      totalSitesPublishedLast24h,
      numberOfSitesPublishedLastWeek,
      totalSitesPublishedLastWeek,
    ] = await Promise.all([
      getTotalUsersCount(),
      getUsersWithSitesCount(),
      getOnboardedUsersCount(),
      getTotalSitesCount(),
      getTotalNumberOfSitesPublished(),
      getTotalSitesPublished(),
      getUsersWithPublishedSitesCount(),
      getUserSignupsInTimeRange(24),
      getUserSignupsInTimeRange(168), // 7 days * 24 hours
      getNumberOfSitesPublishedInTimeRange(24),
      getTotalSitesPublishedInTimeRange(24),
      getNumberOfSitesPublishedInTimeRange(168), // 7 days * 24 hours
      getTotalSitesPublishedInTimeRange(168), // 7 days * 24 hours
    ]);

    // Helper function to calculate percentage
    const calculatePercentage = (part: number, total: number) =>
      total > 0 ? Math.round((part / total) * 100 * 100) / 100 : 0;

    // User percentages
    const withSitesPercentage = calculatePercentage(usersWithSites, totalUsers);
    const onboardedPercentage = calculatePercentage(onboardedUsers, totalUsers);
    const publishedSitesPercentage = calculatePercentage(usersWithPublishedSites, totalUsers);
    const publishRateAmongSiteOwners = calculatePercentage(usersWithPublishedSites, usersWithSites);

    // Site percentages
    const sitesPublishedPercentage = calculatePercentage(totalNumberOfSitesPublished, totalSites);
    const averageVersionsPerPublishedSite =
      totalNumberOfSitesPublished > 0
        ? Math.round((totalSitesPublished / totalNumberOfSitesPublished) * 100) / 100
        : 0;

    const stats = {
      users: {
        total: totalUsers,
        isOnboarded: onboardedUsers,
        onboardedPercentage,
        withSites: usersWithSites,
        withSitesPercentage,
        withPublishedSites: usersWithPublishedSites,
        publishedSitesPercentage,
        publishRateAmongSiteOwners,
        signups: {
          last24Hours: signupsLast24h,
          lastWeek: signupsLastWeek,
        },
      },
      sites: {
        total: totalSites,
        totalNumberOfSitesPublished,
        totalSitesPublished,
        sitesPublishedPercentage,
        averageVersionsPerPublishedSite,
        published: {
          last24Hours: {
            totalNumberOfSitesPublished: numberOfSitesPublishedLast24h,
            totalSitesPublished: totalSitesPublishedLast24h,
          },
          lastWeek: {
            totalNumberOfSitesPublished: numberOfSitesPublishedLastWeek,
            totalSitesPublished: totalSitesPublishedLastWeek,
          },
        },
      },
    };

    return NextResponse.json(
      {
        data: { stats },
        message: "Admin statistics fetched successfully",
      },
      { status: 200 }
    );
  },
  {
    method: "GET",
    route: "/api/admin/dashboard",
  }
);
