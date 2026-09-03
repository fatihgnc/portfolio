/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // BUILD_DIR selects a separate output folder so a production build does not
  // clobber .next while the dev server is running.
  distDir: process.env.BUILD_DIR || ".next",
};

export default nextConfig;
