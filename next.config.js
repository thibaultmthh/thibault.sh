/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.giphy.com'],
  },
}

module.exports = nextConfig
