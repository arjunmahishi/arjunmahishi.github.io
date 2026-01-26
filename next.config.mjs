/**
   * @type {import('next').NextConfig}
   */

const nextConfig   = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/vim-adventures/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/vim-adventures',
        destination: '/posts',
        permanent: true,
      },
    ];
  },
};

export default   nextConfig;
