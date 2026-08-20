import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://eternityhvacr.com",
      lastModified: new Date("2026-08-20"),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        "https://eternityhvacr.com/images/hero-technician-black.jpg",
        "https://eternityhvacr.com/og-eternity-hvacr.png",
      ],
    },
  ];
}
