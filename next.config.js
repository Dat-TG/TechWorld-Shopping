/** @type {import('next').NextConfig} */
const nextConfig = {
   basePath: '',
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: ['placekitten.com', 'dummyimage.com', 'docs.amplify.aws'],
   },
};

module.exports = nextConfig;
