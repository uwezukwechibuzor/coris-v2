/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

  }
  
  module.exports = nextConfig
  
  module.exports = {
    // This will build the project as a standalone app inside the Docker image.
    experimental: {
      outputStandalone: true,
    },

    images: {
      domains: ['http://www.google.com/s2/favicons?domain=https://stake.fish/'],
    },

    module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'ify-loader'
          }
      ]
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },

  output: {
    globalObject: 'this',
  },

  }