// ES 모듈 형식으로 import 구문 사용
import type { NextConfig } from 'next'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const path = require('path')
const url = require('url')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      // 중개서버아 CDN을 사용하는경우 세부 설정이 필요함.
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        // pathname: '/api/character/avatar/**', //optional
      },
      {
        protocol: 'https',
        hostname: 'cdn.yes.monster',
      },
    ],
    // domains: ['rickandmortyapi.com'], // 보다 러프한 설정
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['@'] = path.join(__dirname, 'src')
    }

    if (!config.experiments) {
      config.experiments = {}
    }
    config.experiments.topLevelAwait = true
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  async rewrites() {
    return [
      // {
      //   source: '/graphql',
      //   destination: '/api/graphql',
      // },
      // {
      //   source: '/api/:path((?!auth).*)',
      //   destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      // },
      // {
      //   source: '/api/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      // },
    ]
  },
  async redirects() {
    return []
  },
}

// ES 모듈에서는 export default를 사용하여 기본 내보내기를 정의합니다.
export default withBundleAnalyzer(nextConfig)
