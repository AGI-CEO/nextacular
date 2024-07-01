const path = require('path');

module.exports = {
  images: {
    domains: [''],
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.alias['@/prisma'] = path.join(__dirname, 'prisma');
    config.resolve.alias['@/components'] = path.join(__dirname, 'src/components');
    config.resolve.alias['@/config'] = path.join(__dirname, 'src/config');
    config.resolve.alias['@/hooks'] = path.join(__dirname, 'src/hooks');
    config.resolve.alias['@/layouts'] = path.join(__dirname, 'app'); // Updated to point to the new layouts location
    config.resolve.alias['@/lib'] = path.join(__dirname, 'src/lib');
    config.resolve.alias['@/providers'] = path.join(__dirname, 'src/providers');
    config.resolve.alias['@/sections'] = path.join(__dirname, 'src/sections');
    config.resolve.alias['@/styles'] = path.join(__dirname, 'src/styles');
    return config;
  },
};
