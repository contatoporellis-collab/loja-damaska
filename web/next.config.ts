import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // v16 defaults to [75] only; allow a couple of levels for hero/detail art.
    qualities: [60, 75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
