/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true
  },

  images: {
    domains: ['honghong.me']
  },

  transpilePackages: ['@tabler/icons-react']
}

export default nextConfig
