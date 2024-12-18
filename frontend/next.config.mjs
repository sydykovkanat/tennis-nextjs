/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: '178.62.238.165',
      //   port: '8000',
      //   pathname: '/**',
      // },
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
