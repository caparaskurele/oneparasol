/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // add any external domains you use for blog images / coverImage
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "243225049.fs1.hubspotusercontent-na2.net",
      // add more domains here if needed
    ],
  },
};

module.exports = nextConfig;