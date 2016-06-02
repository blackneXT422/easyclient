var config = require('config');
var authConfig = config.get('auth');
KEYSTONE_PORT = authConfig.port;
KEYSTONE_SERVER = authConfig.serverIp;