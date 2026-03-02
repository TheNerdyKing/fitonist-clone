/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['gsap', '@gsap/react'],
};

export default nextConfig;
