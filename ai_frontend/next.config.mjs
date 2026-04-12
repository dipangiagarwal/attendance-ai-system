// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   output: 'standalone',
//   reactCompiler: true,
//    images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
  
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: true,  // ✅ Moved here
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;