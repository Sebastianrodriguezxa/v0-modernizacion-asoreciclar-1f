/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asorecicladoresp.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.asorecicladoresp.com",
        pathname: "/uploads/**",
      },
    ],
  },
}

export default nextConfig
