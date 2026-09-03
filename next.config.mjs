/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The gallery thumbnails ask for 85. Next 16 only serves the qualities
    // listed here and silently coerces anything else to the nearest one.
    qualities: [75, 85],
  },
};

export default nextConfig;
