/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "productloop.storage.iran.liara.space",
        protocol : "https"
      },
    ],
  },
};

export default nextConfig;
