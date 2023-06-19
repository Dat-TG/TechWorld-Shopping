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
            'cdn.tgdd.vn',
            'img.tgdd.vn',
            'bizweb.dktcdn.net',
        ],
    },
};

module.exports = nextConfig;
