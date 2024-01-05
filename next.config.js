/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_URL,
    trailingSlash: false,
    reactStrictMode: true
}

module.exports = nextConfig