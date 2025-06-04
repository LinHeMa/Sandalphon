/** @type {import('next').NextConfig} */

let assetPrefixPath = ''
switch (process.env.NEXT_PUBLIC_ENV) {
  case 'prod':
    assetPrefixPath = `https://www.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'staging':
    assetPrefixPath = `https://staging.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'dev':
    assetPrefixPath = `https://dev.mirrormedia.mg/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  default:
    assetPrefixPath = ''
    break
}

let basePath = ''

switch (process.env.NEXT_PUBLIC_ENV) {
  case 'prod':
    basePath = `/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'staging':
    basePath = `/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  case 'dev':
    basePath = `/projects/${process.env.NEXT_PUBLIC_PROJECT_NAME}`
    break
  default:
    basePath = ''
    break
}
const nextConfig = {
  assetPrefix: assetPrefixPath,
  images: {
    loader: 'custom',
    loaderFile: './loader.ts',
  },
  basePath: basePath,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },

  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    }
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      }
    )

    return config
  },
}

module.exports = nextConfig
