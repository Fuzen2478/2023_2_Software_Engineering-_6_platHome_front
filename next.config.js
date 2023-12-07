/** @type {import('next').NextConfig} */

const Dotenv = require("dotenv-webpack");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/*",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
};

module.exports = nextConfig;
