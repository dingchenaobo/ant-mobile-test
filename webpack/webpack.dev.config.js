const baseConfig = require('./webpack.base.config');

baseConfig.mode = 'development';

baseConfig.devServer = {
  contentBase: './assets/',
  publicPath: '/assets/'
};

baseConfig.devtool = 'source-map';

baseConfig.module.rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'postcss-loader'
    ],
    include: /node_modules/
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
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
      'postcss-loader',
      'less-loader'
    ],
    exclude: /node_modules/
  },
);

module.exports = baseConfig;
