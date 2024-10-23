// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.resolve.fallback = {
//           ...config.resolve.fallback,
//           fs: false,
//           net: false,
//           tls: false,
//         }
//       }
//       return config
//     },
//   }
  
//   export default nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   api: {
//     bodyParser: false,
//     externalResolver: true,
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/reset-password',
        destination: '/reset-password',
      },
    ]
  },
  images: {
    domains: ['media.giphy.com'],
  }
}

module.exports=nextConfig