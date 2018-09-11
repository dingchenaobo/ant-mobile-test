const path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// resource code path
const SRC_PATH = path.resolve('./src');
// tnpm run build resource path
const ASSETS_BUILD_PATH = path.resolve('./build');

module.exports = {
  context: SRC_PATH,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': SRC_PATH,
    },
  },
  entry: {
    index: ['./app']
  },
  output: {
    path: ASSETS_BUILD_PATH,
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
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader'
          ],
          fallback: 'style-loader'
        }),
        include: /node_modules/
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
    new HtmlWebpackPlugin({
      title: 'ant-mobile-demo',
      template: '../index.html',
      hash: true,
      data: process.env.NODE_ENV
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      ignoreOrder: true
    }),
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
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  }
};
