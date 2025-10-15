import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Docker 배포용
  images: {
    domains: ['api.welcomeu.site'],
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 TypeScript 오류 무시
  },
};

export default withNextIntl(nextConfig);
