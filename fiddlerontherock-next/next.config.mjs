/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/copy-of-booking", destination: "/videos", permanent: true },
      { source: "/shows", destination: "/experiences", permanent: true },
      { source: "/concerts", destination: "/experiences", permanent: true },
      { source: "/shop", destination: "/merch", permanent: true },
      { source: "/press/cbs", destination: "/cbs", permanent: true }
    ];
  }
};

export default nextConfig;
