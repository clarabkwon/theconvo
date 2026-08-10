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
  // Static HTML export for GitHub Pages hosting.
  output: 'export',
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
