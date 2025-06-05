/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = config.externals || {};
      config.externals['bufferutil'] = 'bufferutil';
      config.externals['utf-8-validate'] = 'utf-8-validate';
    }
    return config;
  },
};

module.exports = nextConfig;
