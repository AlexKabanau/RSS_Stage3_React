/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // devIndicators: {
  //   buildActivity: false, // Отключить индикатор активности сборки
  //   autoPrerender: false, // Отключить автоматическую предпросмотр
  // },
  // Отключение Dev Overlay
  // experimental: {
  //   appDir: true, // Если используешь App Router
  //   serverActions: true, // Включает серверные действия
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; // ✅ Работает с "type": "module"