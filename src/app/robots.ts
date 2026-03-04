import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/join/", "/api/", "/physicsdemo/observe/", "/physicsdemo/s/"],
      },
    ],
    sitemap: "https://learnvibecoding.vercel.app/sitemap.xml",
  };
}
