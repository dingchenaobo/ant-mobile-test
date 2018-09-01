const baseConfig = require('./webpack.base.config');

baseConfig.devServer = {
  contentBase: './assets/',
  publicPath: '/assets/'
};

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
        }
      },
      'postcss-loader',
      'less-loader'
    ],
    exclude: /node_modules/
  },
);

module.exports = baseConfig;
