import type { NextConfig } from "next";

const backendHost = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/api\/?$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    if (!backendHost) return [];
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendHost}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
