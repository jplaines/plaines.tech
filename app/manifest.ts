import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jorden Plaines",
    short_name: "Jorden Plaines",
    description:
      "IT, cybersecurity, and AI security portfolio by Jorden Plaines.",
    start_url: "/",
    display: "standalone",
    background_color: "#101311",
    theme_color: "#101311",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
