// /** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config')
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });
//
// module.exports = withPWA({
//   reactStrictMode: false,
//   i18n,
//   env: {
//     API_URL: "https://backendkoa.fast-cybers.com/api/",
//   },
// });

module.exports = {
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd13hhdx1yjmha3.cloudfront.net',
            },
        ],
    },
};