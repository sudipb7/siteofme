import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cv9j7aamp7.ufs.sh",
        protocol: "https",
        pathname: "/f/*",
      },
    ],
  },
};

export default nextConfig;
