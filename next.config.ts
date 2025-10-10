import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Docker 배포용

  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: 'https://welcomeu-api-xkxkkmidlq-du.a.run.app/admin/:path*',
      },
    ];
  },
};

export default nextConfig;
