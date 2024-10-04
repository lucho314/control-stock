/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'https://imgs.search.brave.com',
            }
        ],
    }
};

export default nextConfig;
