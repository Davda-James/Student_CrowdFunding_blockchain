/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
      // Custom Webpack config if needed
      return config;
    },
  };
  
  export default nextConfig;
  