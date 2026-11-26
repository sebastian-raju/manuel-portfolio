import type { MetadataRoute } from "next";
import { site } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.firstName} ${site.lastName}`,
    short_name: site.firstName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
