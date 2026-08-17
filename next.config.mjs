/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? '/theconvo' : ''

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Static export is only for GitHub Pages. Local, Vercel, and DreamHost VPS
  // run as a normal Next.js server so /api/memories can save flowers.
  ...(isGithubPages ? { output: 'export' } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Keep Turbopack rooted in this project so a parent lockfile is ignored.
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
