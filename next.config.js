module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login/SignIn",
        permanent: false,
      },
    ];
  }
}
// const nextConfig = {
//   images: {
//     domains: [
//       "images.unsplash.com",
//       "plus.unsplash.com",
//       "source.unsplash.com",
//     ],
//   },
// };

module.exports = nextConfig;
