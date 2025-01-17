/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["assets.co.dev"],
  },
  webpack: (config, context) => {
    config.optimization.minimize = process.env.NEXT_PUBLIC_CO_DEV_ENV !== "preview";
    return config;
  },
  // Add Azure specific configuration
  env: {
    PORT: process.env.PORT || 3000
  },
  // Ensure proper handling of trailing slashes
  trailingSlash: false,
  // Configure the server to listen on the correct port
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  },
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: true
};

export default nextConfig;