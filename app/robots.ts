import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://proworkflowhub.vercel.app/"; 

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private"], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}