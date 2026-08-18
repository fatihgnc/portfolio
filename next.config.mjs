/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // BUILD_DIR ile ayrı çıktı klasörü: dev sunucusu açıkken build almak
  // .next'i ezmesin diye.
  distDir: process.env.BUILD_DIR || ".next",
};

export default nextConfig;
