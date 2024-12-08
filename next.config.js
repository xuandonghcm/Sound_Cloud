/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/random',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/images/**', // Sử dụng ** để cho phép tất cả hình ảnh trong thư mục này
            },
        ],
    },
    experimental: {
        esmExternals: true, // Cho phép sử dụng ESM module
    },
};

module.exports = nextConfig;
