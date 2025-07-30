const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure for GitHub Pages deployment
if (process.env.NODE_ENV === 'production') {
  config.resolver.platforms = ['web', 'native', 'ios', 'android'];
}

module.exports = config;
