/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'placekitten.com',
            'dummyimage.com',
            'docs.amplify.aws',
            'res.cloudinary.com',
            'upload.wikimedia.org',
            'robohash.org',
        ],
    },
};

module.exports = nextConfig;
