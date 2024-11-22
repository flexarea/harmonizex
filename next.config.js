// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login/SignIn",
        permanent: false,
      },
    ];
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "source.unsplash.com",
    ],
  },
};

export default nextConfig;
