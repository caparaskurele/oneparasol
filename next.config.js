/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "243225049.fs1.hubspotusercontent-na2.net",
      "images.pexels.com",
      // add any other external hostnames you use
    ],
  },
};

module.exports = nextConfig;