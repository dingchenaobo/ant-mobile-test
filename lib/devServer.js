const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../webpack/webpack.dev.config');

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.devServer.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  https: false,
  historyApiFallback: true,
  disableHostCheck: true
});

module.exports = {
  server,
  app: server.app
};