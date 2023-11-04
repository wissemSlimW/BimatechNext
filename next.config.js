/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Routes this applies to
          source: "/(.*)",
          // Headers
          headers: [
            // Allow for specific domains to have access or * for all
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
              // DOES NOT WORK
              // value: process.env.ALLOWED_ORIGIN,
            },
            // Allows for specific methods accepted
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
           
             {
              key: "Cache-Control",
              value: "private, no-cache, no-store, max-age=0, must-revalidate",
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
