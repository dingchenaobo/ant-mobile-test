const path = require('path');
const webpack = require('webpack');

// resource code path
const SRC_PATH = path.resolve('./src');
// tnpm run build resource path
const ASSETS_BUILD_PATH = path.resolve('./build');
// tnpm run dev virtual file path(in memory)
const ASSETS_PUBLIC_PATH = '/assets/';

module.exports = {
  context: SRC_PATH,
  mode: 'development',
  devtool: "source-map",
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
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader']
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader:
        "source-map-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
  ]
};
