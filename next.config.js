module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login/SignIn",
        permanent: false,
      },
    ];
  },
};
