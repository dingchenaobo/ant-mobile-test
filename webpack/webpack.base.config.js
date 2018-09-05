const path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// resource code path
const SRC_PATH = path.resolve('./src');
// tnpm run build resource path
const ASSETS_BUILD_PATH = path.resolve('./build');
// tnpm run dev virtual file path(in memory)
const ASSETS_PUBLIC_PATH = '/assets/';

module.exports = {
  context: SRC_PATH,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  entry: {
    index: ['./app']
  },
  output: {
    path: ASSETS_BUILD_PATH,
    publicPath: ASSETS_PUBLIC_PATH,
    filename: './[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader'
      },
      {
        test: /\.(jsx|tsx|js|ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd-mobile',
                  style: 'css',
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            },
          },
        ],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules\//,
          name: 'vendor',
          priority: 10,
          enforce: true
        },
      }
    }
  }
};
