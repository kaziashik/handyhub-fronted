import type { NextConfig } from "next";

const apiOrigin = (
  process.env.API_PROXY_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://handyhub-api-delta.vercel.app"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
