import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:8085/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
