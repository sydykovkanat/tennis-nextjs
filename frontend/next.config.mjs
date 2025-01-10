/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.DIST_DIR || 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '209.145.52.153',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '209.145.52.153',
        port: '8010',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8010',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
