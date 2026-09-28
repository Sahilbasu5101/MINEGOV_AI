const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Limit Metro worker count to prevent V8 memory exhaustion on Node 24
config.maxWorkers = 2;

module.exports = config;
