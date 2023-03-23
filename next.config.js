/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
       serverComponentsExternalPackages: ['bcrypt']
  },
  transpilePackages: ['jotai-devtools'],
  // future: {
  //   webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
  //     // Looks like backward compatibility approach.
  // },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        net: false,
        dns: false,
        tls: false,
      }
      
    }
  
    return config
  }
};


module.exports = nextConfig
