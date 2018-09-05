const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Cssnano = require('cssnano');

const baseConfig = require('./webpack.base.config');

baseConfig.mode = 'production';

baseConfig.module.rules.push(
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'typings-for-css-modules-loader',
          options: {
            modules: true,
            namedExport: true,
            camelCase: true,
            minimize: true,
          }
        },
        'postcss-loader'
      ],
      fallback: 'style-loader'
    }),
    exclude: /node_modules/
  },
);

baseConfig.plugins.push(
  new OptimizeCssAssetsPlugin({
    canPrint: true,
    cssProcessor: Cssnano,
    cssProcessorPluginOptions: {
      preset: ['default', {
        discardComments: { removeAll: true }
      }],
    },
  }),
);

// analyz
if (process.env.NODE_ENV === 'analyz') {
  baseConfig.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

baseConfig.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'antd-mobile': 'AntdMobile',
};

module.exports = baseConfig;
