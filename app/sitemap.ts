import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jplaines.com",
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://jplaines.com/work/windows-network-exposure-smb-hardening",
      lastModified: new Date("2026-07-14"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
