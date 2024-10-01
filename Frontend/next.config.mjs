/** @type {import('next').NextConfig} */


const hostnames = [
    'lh3.googleusercontent.com',
    'images.unsplash.com',
    'images.pexels.com',
    'ytsaasp.s3.ap-south-1.amazonaws.com',
    'ytsaasp.s3.amazonaws.com',
    'dgieha8wdfqv8.cloudfront.net',
    'encrypted-tbn0.gstatic.com'
]


const nextConfig = {
    images: {
        remotePatterns: hostnames.map(hostname => ({
            protocol: 'https',
            hostname
        }))
    },
};

export default nextConfig;