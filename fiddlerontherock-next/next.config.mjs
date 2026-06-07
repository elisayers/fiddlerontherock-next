/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/copy-of-booking", destination: "/media-merch?tab=watch-listen", permanent: true },
      { source: "/shows", destination: "/live-concerts", permanent: true },
      { source: "/concerts", destination: "/live-concerts", permanent: true },
      { source: "/shop", destination: "/media-merch?tab=shop", permanent: true },
      { source: "/press/cbs", destination: "/cbs", permanent: true },
      { source: "/events", destination: "/live-concerts", permanent: true },
      { source: "/sedona-serenades", destination: "/private-events", permanent: true },
      { source: "/media", destination: "/media-merch?tab=watch-listen", permanent: true },
      { source: "/music", destination: "/media-merch?tab=watch-listen", permanent: true },
      { source: "/videos", destination: "/media-merch?tab=watch-listen", permanent: true },
      { source: "/documentary", destination: "/media-merch?tab=watch-listen", permanent: true },
      { source: "/merch", destination: "/media-merch?tab=shop", permanent: true }
    ];
  }
};

export default nextConfig;
