/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Desabilitar a verificação de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desabilitar a verificação de tipos TypeScript durante o build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
