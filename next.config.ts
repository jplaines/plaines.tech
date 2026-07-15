import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        // The Cloudflare-only worker and D1 templates use runtime globals that
        // standard Next.js does not know about. The app itself is type-checked
        // in the primary vinext build before this static export runs.
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
};

export default nextConfig;
