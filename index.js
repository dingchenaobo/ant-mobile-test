const devServer = require('./lib/devServer').server;
require('./lib/app');

devServer.listen(4200, '0.0.0.0');
