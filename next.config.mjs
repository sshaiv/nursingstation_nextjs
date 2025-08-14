/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true,
  images: {
      unoptimized: true,  // Ensures images are used as normal <img> tags
    },
};

export default nextConfig;

// // next.config.mjs
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

