/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Example: allow images from example-cdn.com
      // { protocol: "https", hostname: "example-cdn.com", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;