/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.woolworths.com.au",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn0.woolworths.media",
        port: "",
      },
      {
        protocol: "https",
        hostname: "shop.coles.com.au",
        port: "",
      },
    ],
  },
  // Remove the below if scraped images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
