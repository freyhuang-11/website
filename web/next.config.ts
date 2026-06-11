import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /blog kept for SEO compat → /insights
      { source: "/blog", destination: "/insights", permanent: true },
      {
        source: "/:locale(en|zh)/blog",
        destination: "/:locale/insights",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
