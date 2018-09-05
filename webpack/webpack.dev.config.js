const baseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

baseConfig.mode = 'development';

baseConfig.devServer = {
  port: 4200,
  host: '0.0.0.0',
  // hot: true,
};

baseConfig.devtool = 'source-map';

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
            localIdentName: "[local]_[hash:base64:5]"
          }
        },
        'postcss-loader'
      ],
      fallback: 'style-loader'
    }),
    exclude: /node_modules/
  },
);

module.exports = baseConfig;
