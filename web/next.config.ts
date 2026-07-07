import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // v16 defaults to [75] only; allow a couple of levels for hero/detail art.
    qualities: [60, 75, 90],
    formats: ["image/avif", "image/webp"],
    // Лендинг — фото не крупнее 1920px: не отдаём 2048/3840 (лишний вес на
    // мобильном). `sizes` у каждого <Image> уже подбирает нужный размер.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
