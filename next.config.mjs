/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep Turbopack rooted in this project so a parent lockfile is ignored.
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
