module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/swipeboard",
        permanent: false,
      },
    ];
  },
};
