const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack.build.config');

baseConfig.plugins.push(
  new BundleAnalyzerPlugin(),
);

module.exports = baseConfig;
