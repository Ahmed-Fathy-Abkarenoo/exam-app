/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/diplomas",
        permanent: true,
      },
      {
        source: "/account",
        destination: "/account/profile",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
        port: "",
        pathname: "/uploads/categories/**",
      },
    ],
  },
};

export default nextConfig;
