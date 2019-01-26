const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css， 和cssnano配合使用
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包文件分析工具
const Cssnano = require('cssnano');
const OfflinePlugin = require('offline-plugin');

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
        'postcss-loader',
        'less-loader',
      ],
      fallback: 'style-loader'
    }),
    exclude: /node_modules/
  },
);

// analyz
if (process.env.NODE_ENV === 'analyz') {
  baseConfig.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

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
  new OfflinePlugin(),
);

baseConfig.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

module.exports = baseConfig;
