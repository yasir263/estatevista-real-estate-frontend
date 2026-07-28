import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions) {
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "estatevista-real-estate-frontend";
  repo = `/${repoName}`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo || undefined,
  assetPrefix: repo || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
